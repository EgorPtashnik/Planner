using { Arma } from '../db/entity/Arma.cds';

service ArmaService {

    entity SqfTag as projection on Arma.SqfTag;

    entity SqfCommandSqfTag as projection on Arma.SqfCommandSqfTag;

    entity SqfType as projection on Arma.SqfType;

    entity SqfCommand as projection on Arma.SqfCommand;

    entity SqfCommandType as projection on Arma.SqfCommandType;

    entity SqfCommandSource as projection on Arma.SqfCommandSource;

    entity SqfCommandParam as projection on Arma.SqfCommandParam;

    entity SqfCommandExample as projection on Arma.SqfCommandExample;

}