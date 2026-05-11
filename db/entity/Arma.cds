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

entity SqfCommand: managed {
    key name: String;
    info: String;
    sourceCode: String;
    syntax: String;

    type: Association to one SqfCommandType;
    source: Association to one SqfCommandSource;

    params: Composition of many SqfCommandParam on params.command = $self;
    examples: Composition of many SqfCommandExample on examples.command = $self;
    tags: Composition of many SqfCommandSqfTag on tags.command = $self;
    related: Composition of many SqfCommandRelated on related.command = $self;
};

entity SqfCommandType {
    key code: Integer;
    name: String;
};

entity SqfCommandSource {
    key code: Integer;
    name: String;
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