namespace Arma;

using { cuid, managed } from '@sap/cds/common';
using { Aspects.baseInfo } from '../Reuse';

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

entity SqfCommand: cuid, managed, baseInfo {

    sourceCode: String;

    syntax: String;

    type: Association to one SqfCommandType;
    source: Association to one SqfCommandSource;

    params: Composition of many SqfCommandParam on params.command = $self;
    examples: Composition of many SqfCommandExample on examples.command = $self;
};

entity SqfCommandType {
    key code: Integer;
    name: String;
};

entity SqfCommandSource {
    key code: Integer;
    name: String;
};

entity SqfCommandParam: cuid, baseInfo {
    key command: Association to SqfCommand;
    type: Association to one SqfType;
    isArray: Integer default false;
    defaultValue: String;

};

entity SqfCommandExample: cuid {
    key command: Association to SqfCommand;
}