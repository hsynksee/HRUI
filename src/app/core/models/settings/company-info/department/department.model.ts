import { BaseCompanyModel } from "../../base-company.model";

export interface DepartmentModel extends BaseCompanyModel{
    branchOfficeId: number;
    branchOfficeName: string;
    managers: Array<BaseCompanyModel>
}
