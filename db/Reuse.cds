context Aspects {

    aspect priority {
        priority: Types.Priority;
    };

    aspect baseInfo {
        name: String;
        info: String;
    }

};


context Types {

    type Priority : Integer enum {
        Low = 1;
        Medium = 2;
        High = 3;
        Urgent = 4;
    };

    type ProgressStatus: Integer enum {
        Created = 0;
        InProgress = 1;
        Completed = 2;
        Canceled = 3;
    }

};
