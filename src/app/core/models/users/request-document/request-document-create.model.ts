import { DocumentTypeEnum } from "src/app/core/enums/request-document/document-type-enum.model";
import { VisaTypeEnum } from "src/app/core/enums/request-document/visa-type-enum.model";

export class RequestDocumentCreateModel{
  userId: number;
  documentType: DocumentTypeEnum;
  viseType: VisaTypeEnum;
  travelStartDate: Date;
  travelEndDate: Date;
  lastDueDate: Date;
  destinationCountry:string;
  description:string;
}
