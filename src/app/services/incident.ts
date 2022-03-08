export interface IIncident {
    _id: string,
    incidentType: string,
    incidentDesc: string,
    incidentPriority: string,
    userName: string,
    contactNumber: string,
    incidentStatus: string,
    incidentResolution:string,
    incidentRecordNumber: string,
    createdOn:string,
    updatedOn:string
    // incident_created_on: string,
    // incident_updated_on: string,
    // incident_status: string,
    // incident_resolution:string,
}