namespace Arma;

using { cuid, managed } from '@sap/cds/common';
using { Aspects.baseInfo } from '../Reuse';

type SqfCommandType: String(10) enum {
    Command = 'Команда';
    Function = 'Функция';
};

type SqfSourceType: String(5) enum {
    BIS = 'BIS';
    CBA = 'CBA';
    EP = 'EP';
};

entity SqfTag: cuid {
    name: String;
};

entity SqfCommandSqfTag {
    key command: Association to SqfCommand;
    key tag: Association to SqfTag;
}

entity SqfType {
    key code: Integer;
    name: String;
};

entity SqfCommand: managed {
    key name: String;
    info: String;
    sourceCode: String;
    syntax: String;

    type: SqfCommandType default 'Функция';
    source: SqfSourceType default 'EP';

    params: Composition of many SqfCommandParam on params.command = $self;
    examples: Composition of many SqfCommandExample on examples.command = $self;
    tags: Composition of many SqfCommandSqfTag on tags.command = $self;
    related: Composition of many SqfCommandRelated on related.command = $self;
};

entity SqfCommandParam: cuid, managed, baseInfo {
    key command: Association to SqfCommand;
    sort: Integer not null;
    type: Association to one SqfType;
    isArray: Boolean default false;
    defaultValue: String;

};

entity SqfCommandExample: cuid {
    key command: Association to SqfCommand;
    text: String;
};

entity SqfCommandRelated: cuid {
    key command: Association to SqfCommand;
    related: String;
}