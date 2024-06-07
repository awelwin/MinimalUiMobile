
export enum StoreActionTypes {
    EmployeeList = '[EmployeeList]',
    EmployeeList_Load = '[EmployeeList] load',
    EmployeeList_Filter = '[EmployeeList] filter',
    EmployeeList_FilterCancel = '[EmployeeList] filterCancel',
    EmployeeList_OpenActionSheet = '[EmployeeList] openActionSheet',
    EmployeeList_LoadResult = '[EmployeeList] loadResult',

    EmployeeList_DeleteRequest = '[EmployeeList] deleteRequest',
    EmployeeList_DeleteRequestConfirmed = '[EmployeeList] deleteRequestConfirmed',
    EmployeeList_DeleteRequestPersisted = '[EmployeeList] deleteRequestPersisted',

    EmployeeList_ModalDismiss = '[EmployeeList] modalDismiss',
    EmployeeList_FilterResult = '[EmployeeList] filterResult',
    EmployeeList_ActionSheetClose = '[EmployeeList] actionSheetClose',


}