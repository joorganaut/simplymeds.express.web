module.exports = {
MessageResponse_SUCCESS : {
    Code: '00',
    Message: 'Approved or Completed Successfully'
},
MessageResponse_ISSUER_DECLINED : {
    Code: '01',
    Message: 'Refer to card User'
},
MessageResponse_ISSUER_DECLINED_SPECIAL : {
    Code: '02',
    Message: 'Refer to card User, Special condition'
},
MessageResponse_INVALID_MERCHANT : {
    Code: '03',
    Message: 'Invalid merchant or service provider'
},
MessageResponse_CARD_LOST_OR_STOLEN : {
    Code: '04',
    Message: 'Card Lost or stolen'
},
MessageResponse_CARD_LOST_OR_STOLEN_REPORTED_LOST : {
    Code: '41',
    Message: 'Merchant should retain card (card reported lost)'
},
MessageResponse_CARD_LOST_OR_STOLEN_REPORTED_STOLEN : {
    Code: '43',
    Message: 'Merchant should retain card (card reported stolen)'
},
MessageResponse_DO_NOT_HONOR : {
    Code: '05',
    Message: 'Do not honor'
},
MessageResponse_GENERAL_ERROR : {
    Code: '06',
    Message: 'General Error'
},
MessageResponse_CARD_LOST_OR_STOLEN_SPECIAL : {
    Code: '07',
    Message: 'Card Lost or stolen or {0}'
},
MessageResponse_SUCCESS_WITH_IDENTIFICATION : {
    Code: '08',
    Message: 'Honor with identification'
},
MessageResponse_REQUEST_IN_PROGRESS : {
    Code: '09',
    Message: 'Request in progress'
},
MessageResponse_ISSUER_DECLINED_PARTIAL : {
    Code: '10',
    Message: 'Partial approval'
},
MessageResponse_SUCCESS_VIP : {
    Code: '11',
    Message: 'VIP approval'
},
MessageResponse_SUCCESS_NO_REASON : {
    Code: '85',
    Message: 'No reason to decline a request for account number verification, address verification, CVV2 verification, or a credit voucher or merchandise return'
},
MessageResponse_TRANSACTION_INVALID : {
    Code: '12',
    Message: 'Invalid transaction'
},
MessageResponse_TRANSACTION_EXCEEDS_AMOUNT_LIMIT : {
    Code: '13',
    Message: 'Invalid amount (currency conversion field overflow) or amount exceeds maximum for card program.'
},
MessageResponse_CARD_NUMBER_INVALID : {
    Code: '14',
    Message: 'Invalid account number (no such number)'
},
MessageResponse_CARD_NUMBER_INVALID_NO_ACTION : {
    Code: '21',
    Message: 'No action taken (unable to back out prior transaction)'
},
MessageResponse_CARD_NUMBER_INVALID_NO_RECORD : {
    Code: '25',
    Message: 'Unable to locate record in file, or account number is missing from the inquiry'
},
MessageResponse_CARD_NUMBER_INVALID_NO_CHECKING_ACCOUNT : {
    Code: '52',
    Message: 'No checking account'
},
MessageResponse_CARD_NUMBER_INVALID_NO_SAVINGS_ACCOUNT : {
    Code: '53',
    Message: 'No savings account'
},
MessageResponse_TRANSACTION_COULD_NOT_BE_ROUTED : {
    Code: '15',
    Message: 'No such issuer'
},
MessageResponse_TRANSACTION_COULD_NOT_BE_ROUTED_NO_DESTINATION : {
    Code: '92',
    Message: 'Destination cannot be found for routing'
},
MessageResponse_INSUFFICIENT_FUNDS : {
    Code: '16',
    Message: 'Insufficient funds'
},
MessageResponse_INSUFFICIENT_FUNDS_SPECIAL : {
    Code: '51',
    Message: 'Insufficient funds {0}'
},
MessageResponse_SERVICE_UNAVAILABLE : {
    Code: '19',
    Message: 'Re-enter transaction'
},
MessageResponse_INVALID_RESPONSE : {
    Code: '20',
    Message: 'Invalid response'
},
MessageResponse_SYSTEM_MALFUNCTION : {
    Code: '22',
    Message: 'Suspected Malfunction'
},
MessageResponse_SYSTEM_MALFUNCTION_INVALID_FIELDS : {
    Code: '96',
    Message: 'System malfunction, System malfunction or certain field error conditions'
},
MessageResponse_FILE_UNAVAILABLE : {
    Code: '28',
    Message: 'File is temporarily unavailable'
},
MessageResponse_FORMAT_ERROR : {
    Code: '30',
    Message: 'Format error'
},
MessageResponse_CARD_EXPIRED : {
    Code: '54',
    Message: 'Expired card'
},
MessageResponse_TRANSACTION_NOT_ALLOWED_CARDHOLDER : {
    Code: '57',
    Message: 'Transaction not permitted to cardholder'
},
MessageResponse_TRANSACTION_NOT_ALLOWED_TERMINAL : {
    Code: '58',
    Message: 'Transaction not allowed at terminal'
},
MessageResponse_TRANSACTION_NOT_ALLOWED_RESTRICTED : {
    Code: '62',
    Message: 'Restricted card (for example, in country exclusion table)'
},
MessageResponse_TRANSACTION_NOT_ALLOWED_LAW_VIOLATION : {
    Code: '93',
    Message: 'Transaction cannot be completed, violation of law'
},
MessageResponse_SUSPECTED_FRAUD : {
    Code: '59',
    Message: 'Suspected fraud'
},
MessageResponse_CARD_ACTIVITY_EXCEEDS_AMOUNT_LIMIT : {
    Code: '61',
    Message: 'Activity amount limit exceeded'
},
MessageResponse_CARD_ACTIVITY_EXCEEDS_AMOUNT_LIMIT_CASHBACK_LIMIT_EXCEEDED : {
    Code: 'N4',
    Message: 'Cashback request exceeds issuer limit'
},
MessageResponse_CVN_MISMATCH : {
    Code: '63',
    Message: 'Security violation'
},
MessageResponse_CVN_MISMATCH_NEGATIVE : {
    Code: '82',
    Message: 'Negative CAM, dCVV, iCVV, or CVV results'
},
MessageResponse_CVN_MISMATCH_NEGATIVE_CVV2_FAILURE : {
    Code: '82',
    Message: 'Decline for CVV2 failure'
},
MessageResponse_CARD_ACTIVITY_EXCEEDS_COUNT_LIMIT : {
    Code: '65',
    Message: 'Activity count limit exceeded'
},
MessageResponse_LATE_RESPONSE : {
    Code: '68',
    Message: 'Response received too late'
},
MessageResponse_CARD_NOT_ACTIVATED : {
    Code: '78',
    Message: 'Blocked, first used. The transaction is from a new cardholder, and the card has not been properly unblocked.'
},
MessageResponse_CARD_EXPIRATION_DATE_INVALID : {
    Code: '80',
    Message: 'Private label and check acceptance: Invalid date'
},
MessageResponse_ISSUER_OR_SWITCH_UNAVAILABLE : {
    Code: '91',
    Message: 'Issuer unavailable or switch inoperative (STIP not applicable or available for this transaction)'
},
MessageResponse_DUPLICATE_TRANSMISSION : {
    Code: '94',
    Message: 'Duplicate transmission'
},
MessageResponse_RECONCILE_ERROR : {
    Code: '95',
    Message: 'Reconcile error'
},
MessageResponse_FORCE_STIP : {
    Code: 'N0',
    Message: 'Force STIP'
},
MessageResponse_CASH_SERVICE_UNAVAILABLE : {
    Code: 'N3',
    Message: 'Cash service not available'
},
MessageResponse_CUSTOMER_INFO_INVALID : {
    Code: 'P2',
    Message: 'Invalid biller information'
},
MessageResponse_CARD_AUTHENTICATION_FAILED : {
    Code: 'Q1',
    Message: 'Card authentication failed'
},
MessageResponse_STOP_PAYMENT : {
    Code: 'R0',
    Message: 'Stop payment order'
},
MessageResponse_REVOCATION_OF_AUTHORIZATION : {
    Code: 'R1',
    Message: 'Revocation of authorization order'
},
MessageResponse_REVOCATION_OF_AUTHORIZATIONS : {
    Code: 'R3',
    Message: 'Revocation of authorizations order'
},
MessageResponse_ISSUER_DECLINED_FORWARD_2_ISSUER : {
    Code: 'XA',
    Message: 'Forward to issuer'
},
MessageResponse_ISSUER_DECLINED_FORWARD_2_ISSUER_2 : {
    Code: 'XD',
    Message: 'Forward to issuer'
},
MessageResponse_UNABLE_TO_GO_ONLINE : {
    Code: 'Z3',
    Message: 'Unable to go online'
},
MessageResponse_INVALID_PRODUCT : {
    Code: 'ZP',
    Message: 'Invalid Product'
},
MessageResponse_INCOMPLETE_REQUEST : {
    Code: 'MR',
    Message: 'Missing Request'
},
MessageResponse_AUTHENTICATION_ERROR : {
    Code: 'AE',
    Message: 'Authentication Error'
},
}