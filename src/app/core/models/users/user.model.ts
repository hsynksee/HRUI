import { AccessTypeEnum } from "../../enums/user/access-type-enum.model";
import { ContractTypeEnum } from "../../enums/user/contract-type-enum.model";

export class UserModel {
    id: number;
    name: string;
    surname: string;
    fullname: string;
    emailBusiness: string;
    emailPersonal: string;
    phoneBusiness: string;
    phonePersonal: string;
    startDate: Date;
    accessType: AccessTypeEnum;
    contractType: ContractTypeEnum;
    contractEndDate: Date;
    profilPicture: string;
    jobTitle: string;
    roles: number[];
    isActive: boolean;
}
