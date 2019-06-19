const ejs = require('ejs')
const fs = require('fs-extra')
const path = require('path')

function checkDirectory(src, dst, callback, data) {
  fs.access(dst, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(dst)
      callback(src, dst, data)
    } else {
      callback(src, dst, data)
    }
  });
};

function copyRender(src, dst, data) {
  const fnames = fs.readdirSync(src)
  fnames.forEach(function (fname) {
    const _src = src + '/' + fname
    const _dst = dst + '/' + fname
    fs.stat(_src, function (err, stats) {
      if (err) throw err
      if (stats.isFile()) {
        if (fname.endsWith('.ejs')) {
          const _dstOrigin = _dst.substr(0, _dst.length - 4)
          const str = ejs.render(fs.readFileSync(_src, 'utf-8'), data)
          fs.writeFileSync(_dstOrigin, str, 'utf-8')
        } else {
          const readable = fs.createReadStream(_src)
          const writable = fs.createWriteStream(_dst)
          readable.pipe(writable)
        }
      } else if (stats.isDirectory()) {
        checkDirectory(_src, _dst, copyRender, data)
      }
    });
  });
}


// TODO: 如果原目录存在，询问。取消或者清空目录

// const root = process.cwd();
// const dst = path.join(root, data.name)

// fs.ensureDirSync(dst)
// copy('./source', dst)

const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    message: '请输入应用名：',
    name: 'name',
    validate: (val) => {
      if (!val) {
        return '请输入有效值'
      }
      if (!(/^\w+$/.test(val))) {
        return '应用名由字母、数字和下划线组成'
      }
      return true
    }
  }, {
    type: 'input',
    message: '请输入应用显示名：',
    name: 'displayName',
    validate: (val) => {
      if (!val) {
        return '请输入有效值'
      }
      return true
    }
  }, {
    type: 'input',
    message: '请输入密钥密码：',
    name: 'password',
    validate: (val) => {
      if (!val) {
        return '请输入有效值'
      }
      if (!(/^\w+$/.test(val))) {
        return '密码由字母、数字和下划线组成'
      }
      return true
    }
  }
]

const questions2 = [
  {
    type: 'input',
    message: '指定项目已经存在，是否重建？',
    name: 'recover',
    default: '否'
  }
]

function copyRenderFiles(dst, data) {
  fs.ensureDirSync(dst)
  copyRender('./source', dst, data)
}

process.on('unhandledRejection', rej => {
  console.error(rej);
  process.exit();
})

inquirer
  .prompt(questions)
  .then(async answers => {

    const root = process.cwd();
    const dst = path.join(root, answers.name)
    
    const ifExists = fs.existsSync(dst)
    if (ifExists) {
      const { recover } = await inquirer.prompt(questions2)
      if (recover === '是') {
        fs.removeSync(dst)
      } else {
        process.exit()
      }
    }

    console.log(`正在创建应用项目 ${answers.name} ...`)
    copyRenderFiles(dst, answers)
    console.log(`已创建应用项目 ${answers.name}\n`)
    
    console.log(`
请输入下面的命令来生成keystore，并将之移动到./android/app/目录下：
keytool -genkey -v -keystore my-release-key.keystore -alias ${answers.name} -keyalg RSA -keysize 2048 -validity 10000 -keypass ${answers.password} -storepass ${answers.password}
    `)
  });
