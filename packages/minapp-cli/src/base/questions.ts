/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

const validateProjectName = require('validate-npm-package-name')
import * as path from 'path'
import * as inquirer from 'inquirer'
import {getGitUser} from './helper'

export interface Answers {
  type: 'Application' | 'Component'
  language: 'TypeScript' | 'JavaScript'
  style: string
  name: string
  state?: 'Mobx' | 'None'
  description: string
  author: string
  appid?: string
  npm: string
}

export function questions(absDir: string) {
  return inquirer.prompt<Answers>([
    {
      type: 'list',
      name: 'type',
      message: 'Project type',
      choices: ['Application', 'Component'],
      default: 0
    },
    {
      type: 'input',
      name: 'version',
      message: 'Project version',
      default: '1.0.0'
    },
    {
      type: 'list',
      name: 'language',
      message: 'Script language',
      choices: ['TypeScript', 'JavaScript'],
      default: 0
    },
    {
      type: 'list',
      name: 'style',
      message: 'Style language',
      choices: ['scss', 'less', 'css', 'wxss'],
      default: 0
    },
    {
      type: 'input',
      name: 'name',
      message: (answers: Answers) => `${answers.type} name`,
      default: path.basename(absDir),
      validate: (answer: Answers) => {
        let result = validateProjectName(answer)
        if (result.validForNewPackages) return true
        let message = [...(result.warnings || []), ...(result.errors || [])]
        return message.join('; ')
      }
    },
    {
      type: 'list',
      name: 'state',
      message: 'Application state management',
      choices: ['Mobx', 'None'],
      default: 0,
      when: (answers: Answers) => answers.type === 'Application'
    },
    {
      type: 'input',
      name: 'description',
      message: (answers: Answers) => `${answers.type} description`,
      default: (answers: Answers) => `A wonderful miniapp ${answers.type.toLowerCase()}`
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author',
      default: getGitUser()
    },
    {
      type: 'input',
      name: 'appid',
      message: 'Wexin app id',
      when: (answers: Answers) => answers.type === 'Application'
    },
    {
      type: 'list',
      name: 'npm',
      message: 'What npm client are you using',
      choices: ['npm', 'cnpm', 'yarn'],
      default: 0,
    }
  ] as any) as Promise<Answers>
}
