namespace Gym;

using { cuid, managed } from '@sap/cds/common';

entity Training: cuid, managed {
    solo: Boolean;
    paid: Boolean default false;
    date: Timestamp;
};
