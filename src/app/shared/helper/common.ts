import { FormGroup, AbstractControl } from '@angular/forms';
import { AES, enc, mode, pad } from 'crypto-js';
import { FileRecords } from '../model/filerecords';
import { CattleTypeEncrypted, EnumDeviceType, EnumRecordType, SerialNoSeries } from '../Enum/apiurl.enum';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import { ConstantMessage } from '../Constant/constant';
import { ToasterService } from '../service/toaster.service';

export let isActiveMenu = 0;
export const strKey = enc.Utf8.parse('7061737323313233');
export const strIv = enc.Utf8.parse('7061737323313233');
export const strKeyAES256ECB = enc.Utf8.parse('12345678901234567890123456789012');
export const dirty = [';', '/', '?', ':', '@', '&', '=', '+', '$', ','];
export const clean = ['p2n3t4G5l6m', 's1l2a3s4h', 'q1e2st3i4o5n', 'T22p14nt2s', 'a9t', 'a2n3nd', 'e1q2ua88l', 'p22l33u1ws', 'd0l1ar5', 'c0m8a1a'];
export const apiVersion = '1.0';
export const defaultPageNo = 1;
export const defaultPageSize = 10;
export const maxCharactersLimitForEmail = 1000;
export const maxCharactersLimitForSMSandNotification = 50;
export const DefaultUserProfileRole = 'DefaultUserProfileRole';
export let menuPermissionObj = {
  isView: true, isAdd: true, isEdit: true, isDelete: true,
  isHistory: true, isExport: true, isViewReport: true, isApprove: true, isShow: true
};

export let menuPermissionCallibrationObj = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionCattleObj = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false, isShow: false
};
export let menuPermissionAIAssign = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionTreatmentAssign = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionTreatmentCancel = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionAIComplete = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionTreatmentComplete = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionDeviceMapObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionObjAnimalTransfer = {
  isView: true, isAdd: true, isEdit: true, isDelete: true,
  isHistory: true, isExport: true, isViewReport: true, isApprove: true, isShow: true
};
export let menuPermissionDynamicAdultObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionConfigReportObj = { isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false };
export let menuPermissionCleaningReportObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionErrorLogObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionCallibrationHistoryReportObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionDeviceLogReportObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionMsPasssordObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionClientMapObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionRoleMapObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionCattleDeviceMapObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionFarmerDeviceMapObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false, isShow: false
};
export let menuPermissionCattleGraphObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionUserMapObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionAlertMapObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionEmailVerificationObj = {
  isView: false, isEdit: false
};

export let menuPermissionCalibrationApprovalObj = {
  isView: false, isEdit: false
};

export let menuPermissionPDComplete = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionCalvingComplete = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionTransferRequest = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionUserLabMapObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionSemenStockAllocationObj = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionUnionLab = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionGatePass = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionGatePassStartEndTrip = {
  isView: false, isAdd: false, isEdit: false, isDelete: false,
  isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionOfflineOnlineReportObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionMilkLogReportObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};

export let menuPermissionResetAuthObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};


export let menuPermissionPredictedAnimalsObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false, isShow: false
};

export let menuPermissionAnimalInHeatObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false, isShow: false
};

export let menuPermissionPDObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false, isShow: false
};

export let menuPermissionAIObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false, isShow: false
};
export let menuPermissionNotCleanedDeviceReportObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionCleaningCountDetailObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionCalibrationHistoryObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};
export let menuPermissionRepeatedOccurrenceReportObj = {
  isView: false, isAdd: false, isEdit: false,
  isDelete: false, isExport: false, isViewReport: false, isApprove: false
};

export const toasterTimeout = 7000;
export const pickerFormat = 'dd-mmm-yyyy';
export let ReportDetails = { id: '', name: '' };
export let AITDashboardPermission: any;
export let MilkAnalyzerDashboardPermission: any;

export const maxFileUploadSize = 4000; // 4MB
const s4 = Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

export const apiUrl = window.location.href.indexOf('4200') >= 0 || window.location.href.indexOf('44315') >= 0
  ? 'https://localhost:44315/api'
  : `${window.location.protocol}//${window.location.host}/api`;

export const paginator = { pageNo: 1, recordsPerPage: 10, sortBy: '', totalPage: 0, seachBy: '', totalRecords: 0 };
export let portNo = '';
export let pageName = '';
export let currentMenu = 0;

export let AppName = {
  AndroidAmcsAppName: "Android Amcs App",
  PromptDeviceAppName: "Prompt Calib+ App",
  BMCSmartBoxUI:'BMCSmartBox.UI',
  PrompCoreApp: 'Prompt Core App',
  WarehouseApp: 'Warehouse App'
}

export let layoutPanelConst = {
  leftAsideOpen: true, rightAsideOpen: false
};

export const AppSettingsKey = {
  MaxRoleAssignToUser: 'MaxRoleAssignToUser',
  MaxClientAssignToUser: 'MaxClientAssignToUser',
  MaxRoleAssignToUserProfile : 'MaxRoleAssignToUserProfile',
  CalibrationRequestApproval : 'CALIBRATIONREQUESTAPPROVAL',
  CalibrationOtp : 'CALIBRATIONOTP'
}

export const projectDetails = {
  name: 'Calibration', dbprefix: 'calibration', version: '1.0.0.0', logo: '../../assets/images/cow-128x128.png', loginLogo: '../../assets/images/farm365_150x150.png'
};

export const projectFacility = {
  socialLog: false, forgotPassword: true, registration: false, contentHeader: false
};

export const storageConst = {
  userProfile: 'UserProfile', menuPermission: 'MenuPermission',cultureId : "CultureId",
  lookupValue: 'ddldata', type: 'typeList', value: 'ValueList',
  systemSettingValue: 'systemSettingList', masterOrganizationList: 'MasterOrganizationList',
  userTypeValue: 'UserType', accessToken: "AccessToken", hmsmobileScreenWidth: 1024, mobileScreenWidth: 995, isAHMobileApp: "IsAHMobileApp", clientId: "orgui"
 // , HeaderOrganizationCount: 'HeaderOrganizationCount'
  , cultureValue: 'Culture', userCultureId: "userCultureId",
  isMobileApp : 'isMobileApp', isHMSModuleMapped : "isHMSModuleMapped",
  isCalibrationMode: "iscalibrationmodetrue"
};

export class storageResourceSet {
  static ResourceSet: string[];
}

export class SetConst {

  static setActiveMenu(menuid) {
    isActiveMenu = menuid;
  }
  static SetMenuPermission(obj, callibrationObj, deviceMapObj, calibrationHitoryReportObj, errorLogReportObj, cleaningReportObj, deviceLogsReportObj,
    dynamicAdultObj, cattleObj, aiAssignObj, aiCompleteObj, pdCompleteObj, calvCompleteObj, transferRequestObj, msPasswordObj, clientMap, alertMap,
    roleMap, userMap, userLabMap, allocationObj, gatePassObj, treatmentAssignObj, treatmentCompleteObj, 
    treatmentCancelObj, unionLab, gatePassStartEndTripObj, cattleDeviceMap, farmerDeviceMap, cattleGraph,OfflineOnlineReport, milkLogReport,resetAuthenticator, 
    predictedAnimals, animalInHeat, pd, ai,emailVerification,cleaningCountDetailReport, notCleanedDeviceReport,
    calibrationHistoryReport, repeatedOccurrenceReport)   
    {
    menuPermissionObj = obj;
    menuPermissionCallibrationObj = callibrationObj;
    menuPermissionCattleObj = cattleObj;
    menuPermissionDeviceMapObj = deviceMapObj;
    menuPermissionCallibrationHistoryReportObj = calibrationHitoryReportObj;
    menuPermissionErrorLogObj = errorLogReportObj;
    menuPermissionCleaningReportObj = cleaningReportObj;
    menuPermissionDeviceLogReportObj = deviceLogsReportObj;
    menuPermissionDynamicAdultObj = dynamicAdultObj;
    menuPermissionAIAssign = aiAssignObj,
    menuPermissionTreatmentAssign=treatmentAssignObj
    menuPermissionTreatmentCancel=treatmentCancelObj
    menuPermissionAIComplete = aiCompleteObj,
    menuPermissionTreatmentComplete=treatmentCompleteObj
    menuPermissionPDComplete = pdCompleteObj,
    menuPermissionCalvingComplete = calvCompleteObj,
    menuPermissionTransferRequest = transferRequestObj
    menuPermissionMsPasssordObj = msPasswordObj;
    menuPermissionClientMapObj=clientMap;
    menuPermissionAlertMapObj = alertMap;
    menuPermissionEmailVerificationObj = emailVerification;
    menuPermissionRoleMapObj = roleMap;
    menuPermissionUserMapObj = userMap;
    menuPermissionUserLabMapObj=userLabMap;
    menuPermissionSemenStockAllocationObj = allocationObj;
    menuPermissionGatePass = gatePassObj;
    menuPermissionUnionLab = unionLab;
    menuPermissionGatePassStartEndTrip = gatePassStartEndTripObj;
    menuPermissionCattleDeviceMapObj = cattleDeviceMap;
    menuPermissionFarmerDeviceMapObj = farmerDeviceMap;
    menuPermissionCattleGraphObj = cattleGraph;
    menuPermissionOfflineOnlineReportObj=OfflineOnlineReport;
    menuPermissionMilkLogReportObj = milkLogReport;
    menuPermissionPredictedAnimalsObj = predictedAnimals;
    menuPermissionAnimalInHeatObj = animalInHeat;
    menuPermissionPDObj = pd;
    menuPermissionAIObj =  ai;
    menuPermissionResetAuthObj = resetAuthenticator;
    menuPermissionCleaningCountDetailObj = cleaningCountDetailReport;
    menuPermissionNotCleanedDeviceReportObj = notCleanedDeviceReport;
    menuPermissionCalibrationHistoryObj = calibrationHistoryReport;
    menuPermissionRepeatedOccurrenceReportObj = repeatedOccurrenceReport;
  }

  static SetReport(id, reportname) {
    ReportDetails = { id: id, name: reportname };
  }
  static SetAITDashboardPermission(obj){
    AITDashboardPermission = obj;
  }

    static SetMilkAnalyzerDashboardPermission(obj){
    MilkAnalyzerDashboardPermission = obj;
  }
}

export let editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '8rem',
  minHeight: '5rem',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'no',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter text here...',
  defaultParagraphSeparator: 'p',
  //defaultFontName: 'Arial',
  //defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],
  //customClasses: [
  //  {
  //    name: 'quote',
  //    class: 'quote',
  //  },
  //  {
  //    name: 'redText',
  //    class: 'redText'
  //  },
  //  {
  //    name: 'titleText',
  //    class: 'titleText',
  //    tag: 'h1',
  //  },
  //],
  //uploadUrl: 'v1/image',
  //upload: (file: File) => { },
  //uploadWithCredentials: false,
  sanitize: false,
  outline: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      'insertImage',
      'insertVideo',
      'subscript',
      'superscript',
      'backgroundColor',
      'toggleEditorMode',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'heading',
    ]
  ]
};

export let disableEditorConfig: AngularEditorConfig = {
  editable: false,
  spellcheck: true,
  height: '8rem',
  minHeight: '5rem',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'no',
  enableToolbar: false,
  showToolbar: false,
  placeholder: 'Enter text here...',
  defaultParagraphSeparator: 'p',
  defaultFontName: 'Arial',
  defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],
  customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  //uploadUrl: 'v1/image',
  //upload: (file: File) => { },
  //uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      'insertImage',
      'insertVideo'
    ]
  ]
};

export class LayoutPanel {
  static Set(type, value) {
    layoutPanelConst[type] = value;
  }
  static SetPageName(str, id) {
    pageName = str;
    currentMenu = id;
  }
  static SetMenuPermission(obj) {
    menuPermissionObj = obj;
  }
}

export class SetComp {
  static ComPort(str) {
    portNo = str;
  }
}

export class FormErrorStateMatcher {
  static isErrorState(control: string | null, form: FormGroup | null, maxlen: number | 0, minValue: number | 1) {
    const value = 'value';
    const required = 'required';
    const maxlength = 'maxlength';
    const min = 'min';
    let error = ((form.controls[control].dirty || form.controls[control].touched)
      && form.controls[control].invalid) ? form.controls[control].errors : null;
    if (form.controls[control].dirty || form.controls[control].touched) {

      if (typeof (form.controls[control][value]) === 'string' && form.controls[control].validator) {
        const validator = form.controls[control].validator({} as AbstractControl);

        if (validator && validator.required && form.controls[control].valid) {
          if ((form.controls[control][value] || '').trim().length === 0) {
            if (error === null || error === undefined) {
              error = { required: true };
            } else {
              error[required] = true;
            }
          }
        } else if (validator && validator.maxlength) {
          if ((form.controls[control][value] || '').trim().length > maxlen) {
            if (error === null || error === undefined) {
              error = { maxlength: true };
            } else {
              error[maxlength] = true;
            }
          }
        } else if (validator && validator.min) {
          if ((form.controls[control][value] || '').trim().length > minValue) {
            if (error === null || error === undefined) {
              error = { min: true };
            } else {
              error[min] = true;
            }
          }
        }
      } else if (typeof (form.controls[control][value]) === 'number' && form.controls[control].validator) {
        const validator = form.controls[control].validator({} as AbstractControl);
        if (validator && validator.required) {
          if ((form.controls[control][value] || 0).length === 0) {
            if (error === null || error === undefined) {
              error = { required: true };
            } else {
              error[required] = true;
            }
          }
        } else if (validator && validator.maxlength) {
          if ((form.controls[control][value] || 0).length > maxlen) {
            if (error === null || error === undefined) {
              error = { maxlength: true };
            } else {
              error[maxlength] = true;
            }
          }
        } else if (validator && validator.min) {
          if ((form.controls[control][value] || 0).length > minValue) {
            if (error === null || error === undefined) {
              error = { min: true };
            } else {
              error[min] = true;
            }
          }
        }
      }
    }
    return error;
  }
}

export function IsEmpty<T>(value: T): boolean {
  if (value === null || value === undefined) {
      return true;
  } else if (Array.isArray(value)) {
      return value.length === 0;
  } else if (typeof value === 'string') {
      return value.trim() === ''; 
  } else if (value instanceof Date) {
      return isNaN(value.getTime()); 
  } else if (typeof value === 'object' && Object.keys(value).length === 0) {
      return true;
  } else {
      return false;
  }
}

export function FormatString(template: string, ...values: string[]): string {
  return template.replace(/\{\d\}/g, (match) => {
    const index = parseInt(match.substring(1, match.length - 1));
    return typeof values[index] !== 'undefined' ? values[index] : match;
  });
}


export class Encryption {
  static encrypt(str) {
    if (!StringExtension.IsNullOrWhiteSpace(str)) {
      const encrypted = AES.encrypt(enc.Utf8.parse(str), strKey, {
        keySize: 128 / 8,
        iv: strIv,
        mode: mode.CBC,
        padding: pad.Pkcs7
      });
      return encrypted.toString();
    } else {
      return '';
    }
  }

  static encryptAES256ECB(str) {
    if (!StringExtension.IsNullOrWhiteSpace(str)) {
      const encrypted = AES.encrypt(enc.Utf8.parse(str), strKeyAES256ECB, {
        keySize: 256 / 8,
        iv: strIv,
        mode: mode.ECB,
        padding: pad.Pkcs7
      });
      return encrypted.toString();
    } else {
      return '';
    }
  }

  static decrypt(str) {
    if (!StringExtension.IsNullOrWhiteSpace(str)) {
      const decrypted = AES.decrypt(str, strKey,
        {
          keySize: 128 / 8,
          iv: strIv,
          mode: mode.CBC,
          padding: pad.Pkcs7
        });
      return decrypted.toString(enc.Utf8);
    } else {
      return '';
    }
  }

  static decryptAES256ECB(str) {
    if (!StringExtension.IsNullOrWhiteSpace(str)) {
      const decrypted = AES.decrypt(str, strKeyAES256ECB, {
        keySize: 256 / 8,
        iv: strIv,
        mode: mode.ECB,
        padding: pad.Pkcs7
      });
      return decrypted.toString(enc.Utf8);
    } else {
      return '';
    }
  }

  // static urlDecode(str) {
  //  clean.forEach((item, index) => str = str.replace(item, dirty[index]));
  //  return str;
  // }

  // static urlEncode(str) {
  //  dirty.forEach((item, index) => str = str.replace(item, clean[index]));
  //  return str;
  // }
  static urlDecode(str) {
    clean.forEach((item, index) => str = str.split(item).join(dirty[index]));
    return str;
  }

  static urlEncode(str) {
    dirty.forEach((item, index) => str = str.split(item).join(clean[index]));
    return str;
  }
}

export class StringExtension {
  static IsNullOrWhiteSpace(s) {
    return ((s !== undefined && s !== null && (typeof (s) !== 'string' ? s.toString() : s).trim() !== '') ? false : true);
  }

  static Guid() {
    return s4 + s4 + '-' + s4 + '-' + s4 + '-' + s4 + '-' + s4 + s4 + s4;
  }

  static ToInt(s) {
    return parseInt(s, 10);
  }
}

export class ArryaExtension {
  static Distinct(ary, prop) {
    return [... new Set(ary.map(i => i[prop]))];
  }
  static DistinctWithType(ary, prop, type) {
    return [... new Set(ary.map(i => {
      {
        switch (type) {
          case 'string':
            // tslint:disable-next-line:no-unused-expression
            return typeof (i[prop]) === 'string' ? i[prop] : i[prop].toString();

          case 'number':
            // tslint:disable-next-line:no-unused-expression
            return typeof (i[prop]) === 'number' ? i[prop] : StringExtension.ToInt(i[prop]);
        }
      }
    }))];
  }
  static RightJoin(leftArray, rightArray, prop) {
    const distinctary = leftArray.map(e => e[prop]);
    return rightArray.filter(e => distinctary.indexOf(e[prop]) < 0);
  }

  static dynamicSort(property, direction) {
    let sortdirection = 1;
    if (direction === 'desc') {
      sortdirection = -1;
    }

    return (a, b) => {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortdirection;
    };
  }
}

export class ResponseExtension {
  static Get(data) {
    if (data.body !== undefined) {
      if (data.body.statusCode >= 200 && data.body.statusCode < 300) {
        return data.body.data;
      }
    }
  }
}

export class DateExtension {
  static ToString(dt: Date, format: string) {
    const mnthary = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dd = NumberExtension.PadNum(dt.getDate(), '0', 2);
    const MM = NumberExtension.PadNum(dt.getMonth() + 1, '0', 2);
    const MMM = mnthary[dt.getMonth()];
    const yyyy = dt.getFullYear().toString();
    const HH = NumberExtension.PadNum(dt.getDate(), '0', 2);
    const hh = StringExtension.ToInt(HH) >= 12 ? (StringExtension.ToInt(HH) - 12).toString() : HH;
    const min = NumberExtension.PadNum(dt.getDate(), '0', 2);
    return format.replace('dd', dd).replace('MMM', MMM).replace('MM', MM).replace('yyyy', yyyy).replace('HH', HH)
      .replace('hh', hh).replace('mm', min);
  }

  static Map(dt: string, fromFormat: string, toFormat: string, sep: string) {
    const mnthary = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // fromFormat
    const ffdt = fromFormat.split(' ')[0];
    const fftm = fromFormat.split(' ').length > 1 ? fromFormat.split(' ')[1] : '';
    const fftt = fromFormat.split(' ').length > 2 ? fromFormat.split(' ')[2] : '';

    const vfdt = dt.split(' ')[0];
    const vftm = dt.split(' ').length > 1 ? dt.split(' ')[1] : '';
    const vftt = dt.split(' ').length > 2 ? dt.split(' ')[2] : '';

    const idd = ffdt.split(sep).findIndex(e => e === 'dd');
    const iMM = ffdt.split(sep).findIndex(e => e === 'MM'); // starts from 1
    const iMMM = ffdt.split(sep).findIndex(e => e === 'MMM'); // short form
    const iyyyy = ffdt.split(sep).findIndex(e => e === 'yyyy');
    const iHH = !StringExtension.IsNullOrWhiteSpace(fftm) ? fftm.split(':').findIndex(e => e === 'HH') : -1;
    const ihh = !StringExtension.IsNullOrWhiteSpace(fftm) ? fftm.split(':').findIndex(e => e === 'hh') : -1;
    const imin = !StringExtension.IsNullOrWhiteSpace(fftm) ? fftm.split(':').findIndex(e => e === 'mm') : -1;
    const dd = StringExtension.ToInt(vfdt.split(sep)[idd]);
    const mm = iMM >= 0 ? (StringExtension.ToInt(vfdt.split(sep)[iMM]) - 1) : mnthary.indexOf(vfdt.split(sep)[iMMM]);

    const yyyy = StringExtension.ToInt(vfdt.split(sep)[iyyyy]);
    let hh = 0;
    let min = 0;
    if (!StringExtension.IsNullOrWhiteSpace(vftm)) {
      hh = iHH >= 0 ? StringExtension.ToInt(vftm.split(':')[iHH]) : (ihh >= 0) ?
        (vftt.toLowerCase() === 'pm' ? StringExtension.ToInt(vftm.split(':')[ihh]) + 12 :
          StringExtension.ToInt(vftm.split(':')[ihh])) : 0;
      min = StringExtension.ToInt(vftm.split(':')[imin]);
    }

    const FromDate = new Date(yyyy, mm, dd, hh, min);
    const hour = StringExtension.ToInt(NumberExtension.PadNum(FromDate.getHours(), '0', 2));
    return toFormat.replace('dd', (NumberExtension.PadNum(FromDate.getDate(), '0', 2)))
      .replace('MMM', mnthary[FromDate.getMonth()])
      .replace('MM', (NumberExtension.PadNum((FromDate.getMonth() + 1), '0', 2)))
      .replace('yyyy', FromDate.getFullYear().toString())
      .replace('hh', (hour > 11 ? (NumberExtension.PadNum((hour - 12), '0', 2)) : (NumberExtension.PadNum(hour, '0', 2))))
      .replace('HH', (NumberExtension.PadNum(hour, '0', 2)))
      .replace('mm', NumberExtension.PadNum(FromDate.getMinutes(), '0', 2))
      .replace('tt', (hour > 11 ? 'pm' : 'am')).replace('TT', (hour > 11 ? 'PM' : 'AM'));
  }

  static APItoUI(dt: string) {
    return DateExtension.Map(dt, 'MM-dd-yyyy HH:mm', 'dd-MMM-yyyy hh:mm tt', '-');
  }

  static UItoAPI(dt: string) {
    return DateExtension.Map(dt, 'dd-MMM-yyyy hh:mm tt', 'MM-dd-yyyy HH:mm', '-') + ':00';
  }

  static MapTime(dt: string, fromFormat: string, toFormat: string, sep: string) {
    const fftm = fromFormat.split(' ').length > 1 ? fromFormat.split(' ')[0] : '';
    const vftm = dt.split(' ').length > 1 ? dt.split(' ')[0] : '';
    const vftt = dt.split(' ').length >= 2 ? dt.split(' ')[1] : '';
    const iHH = !StringExtension.IsNullOrWhiteSpace(fftm) ? fftm.split(':').findIndex(e => e === 'HH') : -1;
    const ihh = !StringExtension.IsNullOrWhiteSpace(fftm) ? fftm.split(':').findIndex(e => e === 'hh') : -1;
    const imin = !StringExtension.IsNullOrWhiteSpace(fftm) ? fftm.split(':').findIndex(e => e === 'mm') : -1;

    let hh = 0;
    let min = 0;
    if (!StringExtension.IsNullOrWhiteSpace(vftm)) {
      hh = iHH >= 0 ? StringExtension.ToInt(vftm.split(':')[iHH]) : (ihh >= 0) ?
        (vftt.toLowerCase() === 'pm' ? StringExtension.ToInt(vftm.split(':')[ihh]) + 12 :
          StringExtension.ToInt(vftm.split(':')[ihh])) : 0;
      min = StringExtension.ToInt(vftm.split(':')[imin]);
    }

    const hour = hh;
    return toFormat.replace('hh', (hour > 11 ? (NumberExtension.PadNum((hour - 12), '0', 2)) : (NumberExtension.PadNum(hour, '0', 2))))
      .replace('HH', (NumberExtension.PadNum(hour, '0', 2)))
      .replace('mm', NumberExtension.PadNum(min, '0', 2))
      .replace('tt', (hour > 11 ? 'pm' : 'am')).replace('TT', (hour > 11 ? 'PM' : 'AM'));
  }
  static UItoAPITime(dt: string) {
    return DateExtension.MapTime(dt, 'hh:mm tt', 'HH:mm', '-') + ':00.0000000';
  }
}

export class NumberExtension {
  static PadNum(val, padd, count): string {
    let value = '';
    value = typeof (val) === 'number' ? val.toString() : val;
    for (let index = 0; index < (count - value.length); index++) {
      value = padd + value;
    }
    return value;
  }
}

export class FormDataSpaceTrim {
  static Trim(s) {
    return ((s !== undefined && s !== null && typeof (s) === 'string') ? s.trim() : '');
  }
}

export class ConvertString {
  static convertToPlainText(htmlString, isModeChanged = false) {
    var regex = /<\/?(?!(?:p)\b)[a-z](?:[^>"']|"[^"]*"|'[^']*')*>/ig;
    if (htmlString !== null && htmlString !== '' && htmlString !== undefined) {
      if (isModeChanged) {
        var detailString= htmlString.replace(regex, "");
        return detailString.replace(/<p[^>]*>/ig, "<p>");
      }
      return htmlString;
    }
    return "";
  }
}

export class CommaSepratedSerialNumber {
  // if file have header
  static getHeaderArray(recordsArr: any) {
    const headers = (recordsArr[0]).split(',');
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  static checkspecialCharacter(record)
  {
    return record.match("[^A-Za-z0-9]") ? true : false;
  }


  static getSerialNoList(recordsArray: any, existingDbRecordsArray: any, validDbRecordsArray: any,isFileUploadWithHeader: any,deviceType) {
    let resultArray = [];
    let headerLength = 0;
    let loopStart = 0;
    if (isFileUploadWithHeader) {
      headerLength = this.getHeaderArray(recordsArray).length;
      loopStart = 1;
    }
    let index = 0;
    let checkspecial;
    for (let i = loopStart; i < recordsArray.length; i++) {

      const currentRecord = recordsArray[i].SerialNo !== undefined ? [recordsArray[i].SerialNo] : (recordsArray[i]).split(',');
      for (let j = 0; j < currentRecord.length; j++) {
        const serialNo = currentRecord[j].trim();
        if (serialNo !== undefined && serialNo !== '' && serialNo !== "") {
          checkspecial = this.checkspecialCharacter(serialNo);
        }
        else {
          checkspecial = false;
        }
        if (isFileUploadWithHeader) {
          if (currentRecord.length === headerLength) {
            resultArray = this.setResultArray(index, serialNo, resultArray,validDbRecordsArray,checkspecial,deviceType);
          } else {
            resultArray = this.setResultArray(index, serialNo, resultArray,validDbRecordsArray,checkspecial,deviceType);
          }
        } else {
          resultArray = this.setResultArray(index, serialNo, resultArray,validDbRecordsArray,checkspecial,deviceType);
        }
        index = index + 1;
      }
    }
    resultArray = this.setDuplicateandExistRecords(existingDbRecordsArray, resultArray);
    return resultArray;
  }

  static setResultArray(index, serialNo, resultArray,validDbRecordsArray,checkspecial,deviceType): any {
    if (serialNo !== '' && serialNo !== null) {
      if (!this.TestSerialNo(serialNo,deviceType) || (validDbRecordsArray.find(x => x.serialNo.toLowerCase() === serialNo.toLowerCase()
          || x.serialNo.toLowerCase().replace(SerialNoSeries[0],SerialNoSeries.mm) === serialNo.toLowerCase()
          || x.serialNo.toLowerCase().replace(SerialNoSeries[1],SerialNoSeries.im) === serialNo.toLowerCase()
          || x.serialNo.toLowerCase().replace(SerialNoSeries[2],SerialNoSeries.mn) === serialNo.toLowerCase()) === undefined)) {
        resultArray.push(this.pushRecordsinArray(index, serialNo, EnumRecordType.Invalid,checkspecial));
      }
      else {
        if (resultArray.find(x => x.serialNo.toLowerCase() === serialNo.toLowerCase()
            || x.serialNo.toLowerCase().replace(SerialNoSeries[0],SerialNoSeries.mm) === serialNo.toLowerCase()
            || x.serialNo.toLowerCase().replace(SerialNoSeries[1],SerialNoSeries.im) === serialNo.toLowerCase()
            || x.serialNo.toLowerCase().replace(SerialNoSeries[2],SerialNoSeries.mn) === serialNo.toLowerCase()) === undefined) {
          resultArray.push(this.pushRecordsinArray(index, serialNo, EnumRecordType.None,checkspecial));
        } else {
          resultArray.push(this.pushRecordsinArray(index, serialNo, EnumRecordType.Duplicate,checkspecial));
        }
      }
    }
    return resultArray;
  }

  static setDuplicateandExistRecords(existingDbRecordsArray, resultArray) {
    if (existingDbRecordsArray != null && existingDbRecordsArray.length > 0) {
      for (let i = 0; i < existingDbRecordsArray.length; i++) {
        for (let j = 0; j < resultArray.length; j++) {
          if (existingDbRecordsArray[i].serialNo.toLowerCase() === resultArray[j].serialNo.toLowerCase()
              || existingDbRecordsArray[i].serialNo.toLowerCase().replace(SerialNoSeries[0],SerialNoSeries.mm) === resultArray[j].serialNo.toLowerCase()
              || existingDbRecordsArray[i].serialNo.toLowerCase().replace(SerialNoSeries[1],SerialNoSeries.im) === resultArray[j].serialNo.toLowerCase()
              || existingDbRecordsArray[i].serialNo.toLowerCase().replace(SerialNoSeries[2],SerialNoSeries.mn) === resultArray[j].serialNo.toLowerCase()) {
            if (resultArray[j].recordType === EnumRecordType.Duplicate) {
              resultArray[j].recordType = EnumRecordType.Both;
            } else if (resultArray[j].recordType !== EnumRecordType.Duplicate) {
              resultArray[j].recordType = EnumRecordType.ExistsInDB;
            }
          }
        }
      }
    }
    resultArray = [].concat(
      resultArray.filter(m => m.recordType === EnumRecordType.Invalid),
      resultArray.filter(m => m.recordType === EnumRecordType.Duplicate),
      resultArray.filter(m => m.recordType === EnumRecordType.ExistsInDB),
      resultArray.filter(m => m.recordType === EnumRecordType.Both),
      resultArray.filter(m => m.recordType === EnumRecordType.None));
    return resultArray;
  }

  static pushRecordsinArray(rowId, serialNo, recordType,isSpecialChar = false) {
    const record: FileRecords = new FileRecords();
    record.id = rowId;
    record.serialNo = serialNo;
    record.recordType = recordType;
    record.isSpecialChar = isSpecialChar;
    record.isSelected = false;
    return record;
  }

  static getRecordsInJson(resultArray) {
    return JSON.stringify(resultArray);
  }

  static TestSerialNo(serialNo, deviceType) {
    if (deviceType === EnumDeviceType.MilkAnalyzer)
      return /^[0-9]{4}[mM][mnkMNK][0-9]{4}$/.test(serialNo);
    else if (deviceType === EnumDeviceType.Fatomatic)
      return /^[0-9]{4}[a-zA-Z]{2}[0-9]{4}$/.test(serialNo);
    else
      return /^[0-9a-zA-Z]+$/.test(serialNo);
  }
}

export class DOBAgeCalculation{
  static DOBValueChange(birthDateString: any) {
    const currentDate = new Date();
    let birthDate: Date;
    if (/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(birthDateString)) {
      birthDate = moment(birthDateString, 'DD/MM/YYYY').toDate();
    }
    else {
      birthDate = new Date(birthDateString);
    }
    let ageyear = moment().diff(birthDate, 'years');
    let agemonth = (moment().diff(birthDate, 'months'))%12;
    if (agemonth < 0) {
      ageyear--;
      agemonth = (12 + agemonth);
    }

    // To calculate the time difference of two dates
    var Difference_In_Time = currentDate.getTime() - birthDate.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    let age = [ageyear, agemonth, Difference_In_Days];
    return age;
  }

  static calculateBirthDate(year,month) {
    const yearNo = parseInt(year, 10);
    const monthNo = parseInt(year, 10);
    if (!isNaN(yearNo) && !isNaN(monthNo)) {
      const today = new Date();
      const birthDate = new Date();
      birthDate.setFullYear(today.getFullYear() - yearNo);
      birthDate.setMonth(today.getMonth() - month);
      return birthDate;
    }
  }
}
export class ListMethods{
  static SetAITList(res: any[]) {
    let technicianList = [];
    if (res.some(item => item.isPrimaryUser)) {
      technicianList.push({ name: 'Primary', userList: res.filter(user => user.isPrimaryUser).map(user => {
          return {
            code: user.userId,
            name: user.fullName
          }
        })
      });
    }
    if (res.some(item => !item.isPrimaryUser)) {
      technicianList.push({ name: 'Secondary', userList: res.filter(user => !user.isPrimaryUser).map(user => {
          return {
            code: user.userId,
            name: user.fullName
          }
        })
      });
    }
    return technicianList;
  }

  static SetAITStatusList(res: any[]) {
    let technicianList = [];
    if (res.some(item => item.status)) {
      res.filter(user => user.status).map(user => {
        technicianList.push({
          code: user.userId,
          name: user.fullName,
          group: "Active"
        })
      });
    }
    if (res.some(item => !item.status)) {
      res.filter(user => !user.status).map(user => {
        technicianList.push({
          code: user.userId,
          name: user.fullName,
          group: "InActive"
        })
    });
    }
    return technicianList;
  }

  static SetRouteStatusList(res: any[]) {
    let routeList = [];


    res.forEach(route => {
      if (route.status === "Active") {
        routeList.push({
          code: route.id,
          name: route.name,
          group: "Active"
        });
      } else if ( route.status === "Past") {
        routeList.push({
          code: route.id,
          name: route.name,
          group: "InActive"
        });
      }
    });

    return routeList;
  }









  //  if (res.some(item => item.status)) {
  //    res.filter(route => route.status).map(route => {
  //      routeList.push({
  //        code: route.id,
  //        name: route.name,
  //        group: "Active"
  //      })
  //    });
  //  }
  //  if (res.some(item => item.status ==='Past')) {
  //    res.filter(route => !route.status).map(route => {
  //      routeList.push({
  //        code: route.id,
  //        name: route.name,
  //        group: "InActive"
  //      })
  //    });
  //  }
  //  return routeList;
  //}





  static SetBreedList(res: any[]) {
    let breedList = [];
    if (res.some(item => item.animalTypeId === CattleTypeEncrypted.Cow)) {
      res.filter(breed => breed.animalTypeId === CattleTypeEncrypted.Cow).map(breed => {
        breedList.push({
          code: breed.id,
          name: breed.name,
          group: "Cow"
        })
      });
    }
    if (res.some(item => item.animalTypeId === CattleTypeEncrypted.Buffalo)) {
      res.filter(breed => breed.animalTypeId === CattleTypeEncrypted.Buffalo).map(breed => {
        breedList.push({
          code: breed.id,
          name: breed.name,
          group: "Buffalo"
        })
      });
    }
    return breedList;
  }


  static ExpandData = (data: any[], columnsToExpand: string[]): any[] => {
    const expandedData: any[] = [];

    data.forEach(item => {
      let maxLength = 1;
      columnsToExpand.forEach(column => {
        if (item[column]) {
          const values = item[column].split('|');
          if (values.length > maxLength) {
            maxLength = values.length;
          }
        }
      });

      for (let i = 0; i < maxLength; i++) {
        const newItem = { ...item };
        columnsToExpand.forEach(column => {
          if (item[column]) {
            const values = item[column].split('|');
            newItem[column] = values[i] ? values[i] : null;
          }
        });
        expandedData.push(newItem);
      }
    });

    return expandedData;
  };




}


export interface FooterOptions {
  createdOn: Date,
  createdBy: string,
  updatedOn: Date,
  updatedBy: string
}


export class ScreenHelper {
  static isLargeScreen: boolean = window.innerWidth >= 992;

  static updateSize(width: number) {
    this.isLargeScreen = width >= 992;
  }
}

export function replaceSerialNoWithValue(str: string, deviceType: string): string {
  if (!str || str === "''") return '';

  const deviceTypeEnumKey = Object.keys(EnumDeviceType)
    .find(key => key.toLowerCase() === deviceType.toLowerCase());

  if (!deviceTypeEnumKey) return str;

  const isMilkAnalyzer = EnumDeviceType[deviceTypeEnumKey as keyof typeof EnumDeviceType] === EnumDeviceType.MilkAnalyzer;

  if (isMilkAnalyzer && str.length === 10) {
    const characters = str.substring(str.length - 6, str.length - 4).toLowerCase();

    const serialEnumKey = Object.keys(SerialNoSeries)
      .find(k => k.toLowerCase() === characters);

    if (serialEnumKey) {
      const serialValue = SerialNoSeries[serialEnumKey as keyof typeof SerialNoSeries].toString();
      return replaceAt(str, 4, 2, serialValue);
    }
  }

  return str;
}

function replaceAt(input: string, index: number, length: number, replacement: string): string {
  return input.substring(0, index) + replacement + input.substring(index + length);
}

export class CommonHelper {
  static changedatetimeformateForReportDownload(): any {
    const currentdate = new Date();
    const datePipe = new DatePipe('en-IN');
    const value = datePipe.transform(currentdate, 'dd-MM-yyyy hh:mm a');
    return value;
  }

  static changedatetimeformate(data: any): any {
    const newdata = new Date(data);
    let value = [];
    let datePipe = new DatePipe('en-IN');
    value.push(datePipe.transform(newdata));
    value.push(datePipe.transform(newdata, 'HH:mm'));
    return value;
  }

  static saveAsBlob(data: any, filename: any, fromDate: any, toDate: any) {
    if (data !== undefined) {
      saveAs(data, filename + "_" + fromDate + "_" + toDate  + '.xlsx', {
        type: data.type
      });
    }
  }

  static saveFile(data) {
    const byteString = window.atob(data.fileContents);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: data.contentType });
    return new File([blob], data.fileDownloadName, { type: data.contentType });
  }


  static MaintainPagination(paginationObj, response): any {
    if (response.pageNo !== undefined) {
      paginationObj.pageNo = response.pageNo;
      paginationObj.pageSize = response.recordsPerPage;
      paginationObj.totalPages = response.totalPage;
      paginationObj.sort = response.sortBy;
      paginationObj.sort = response.sortBy.toLowerCase().indexOf(' desc') >= 0 ? '-' + response.sortBy.split(' ')[0].trim() : response.sortBy;
      paginationObj.totalRecords = response.totalRecords;
    } else {
      this.ResetePaginationObj(paginationObj);
    }
    return paginationObj;
  }
  static ResetePaginationObj(paginationObj): any {
    paginationObj.pageNo = defaultPageNo;
    paginationObj.pageSize = defaultPageSize;
    paginationObj.totalPages = 0;
    paginationObj.sort = '';    
    paginationObj.totalRecords = 0;
    return paginationObj;
  }

  static MaintainNextCall(paginationObj, obj): any {
    paginationObj.pageNo = obj.pageNo;
    paginationObj.pageSize = obj.pageSize;
    paginationObj.sort = obj.sort;
    paginationObj.search = obj.search;
    return paginationObj;
  }

  static dateValidation(fromDate: any, toDate: any, toasterService: ToasterService, is180Days = null): any {
    if (fromDate > toDate) {
      toasterService.showMessage(ConstantMessage.WarningAlertType, ConstantMessage.StartDateAndEndDateCompare);
      return false;
    }

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(fromDate);
    const secondDate = new Date(toDate);

    const diffDays = Math.round(Math.abs((Number(firstDate) - Number(secondDate)) / oneDay));
    if(is180Days && diffDays > 180){
      toasterService.showMessage(ConstantMessage.WarningAlertType, ConstantMessage.StartDateAndEndDateDifferenceForPdp);
      return false;
    }
    else if (IsEmpty(is180Days) && diffDays > 30) {
      toasterService.showMessage(ConstantMessage.WarningAlertType, ConstantMessage.StartDateAndEndDateDifferenceForCommon);
      return false;
    }
    return true;
  }

  static dynamicSort(property: string) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a: { [x: string]: any }, b: { [x: string]: any }) => {
      const result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
}