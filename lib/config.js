'use babel';

export default {
  builderList:{
    title:'Builder List',
    description:'List of Builers',
    type: 'string',
    default:'tableBuilder,indexDBBuilder,lexDBBuilder,grammarDBBuilder,programDBBuilder,dialogDBBuilder,scenarioDBBuilder,promptDBBuilder,referenceDBBuilder',
    order:1
  },
  tableBuilder: {
    title: 'Table Builder',
    description: 'Path of Table Builder',
    type: 'string',
    default: '',
    order: 2
  },
  indexDBBuilder: {
    title: 'Index DB Builder',
    description: 'Path of Index DB Builder',
    type: 'string',
    default: '',
    order: 3
  },
  lexDBBuilder: {
    title: 'Lex DB Builder',
    description: 'Path of Lex DB Builder',
    type: 'string',
    default: '',
    order: 4
  },
  grammarDBBuilder: {
    title: 'Grammar DB Builder',
    description: 'Path of Grammar DB Builder',
    type: 'string',
    default: '',
    order: 5
  },
  programDBBuilder: {
    title: 'Program DB Builder',
    description: 'Path of Program DB Builder',
    type: 'string',
    default: '',
    order: 6
  },
  dialogDBBuilder: {
    title: 'Dialog DB Buiilder',
    description: 'Path of Dialog DB Builder',
    type: 'string',
    default: '',
    order: 7
  },
  scenarioDBBuilder: {
    title: 'Scenario DB Builder',
    description: 'Path of Scenario DB Builder',
    type: 'string',
    default: '',
    order: 8
  },
  promptDBBuilder: {
    title: 'Prompt DB Builder',
    description: 'Path of Prompt DB Builder',
    type: 'string',
    default: '',
    order: 9
  },
  referenceDBBuilder: {
    title: 'Reference DB Builder',
    description: 'Path of Reference DB Builder',
    type: 'string',
    default: '',
    order: 10
  },
};
