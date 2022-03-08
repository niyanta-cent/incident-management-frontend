export class editIncidentModel{

    // incidentRecordNumber:string;
    // incidentDescription:string;
    // contactNumber:string;
    // incidentStatus:string
    // incidentType:string;
    // incidentPriority:string;
   

    // constructor(incidentRecordNumber:string, incidentDescription:string, contactNumber:string, incidentStatus:string, incidentType:string, incidentPriority:string){
    //     this.incidentRecordNumber = incidentRecordNumber;
    //     this.incidentDescription = incidentDescription;
    //     this.contactNumber = contactNumber;
    //     this.incidentStatus = incidentStatus;
    //     this.incidentType = incidentType;
    //     this.incidentPriority = incidentPriority;
    // }
    
    constructor(
        public _id: string,
        public userName: string,
        public incidentRecordNumber:string,
        public incidentDescription:string,
        public contactNumber:string,
        public incidentStatus:string,
        public incidentType:string,
        public incidentPriority:string,
    ){

    }

}