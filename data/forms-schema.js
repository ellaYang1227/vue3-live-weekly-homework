export const formsSchema = {
    username: {
        formType: 'input',
        name: 'Email 帳號',
        type: 'email',
        error: '必填欄位，須符合 Email 格式',
        validates: {
            isRequired: true,
            pattern: '^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4})*$'
        }
    },
    password: {
        formType: 'input',
        name: '密碼',
        type: 'password',
        help: '密碼需至少 8 碼以上，並英數混合',
        error: '必填欄位，密碼需至少 8 碼以上，並英數混合',
        validates: {
            isRequired: true,
            pattern: '^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$'
        }
    },
    product_title: {
        formType: 'input',
        name: '產品名稱',
        type: 'text',
        error: '必填欄位，最多 50 個字',
        validates: {
            isRequired: true,
            maxlength: 50
        }
    },
    product_category: {
        formType: 'input',
        name: '分類',
        type: 'text',
        error: '必填欄位，最多 15 個字',
        validates: {
            isRequired: true,
            maxlength: 15
        }
    },
    product_AD_type: {
        formType: 'select',
        name: '廣告標籤',
        isMultiple: false,
        options: [{
            label: '新品上市', value: '新品上市'
        },{
            label: '人氣商品', value: '人氣商品'
        },{
            label: '強力主打', value: '強力主打'
        }],
        validates: {
            isRequired: false
        }
    },
    product_unit: {
        formType: 'input',
        name: '單位',
        type: 'text',
        error: '必填欄位',
        validates: {
            isRequired: true
        }
    },
    product_origin_price: {
        formType: 'input',
        name: '原價',
        type: 'number',
        error: '必填欄位，需為正整數',
        validates: {
            isRequired: true,
            min: 1
        }
    },
    product_price: {
        formType: 'input',
        name: '售價',
        type: 'number',
        error: '必填欄位，需為正整數',
        validates: {
            isRequired: true,
            min: 1
        }
    },
    product_description: {
        formType: 'textarea',
        name: '產品描述',
        error: '必填欄位',
        validates: {
            isRequired: true
        }
    },
    product_content: {
        formType: 'textarea',
        name: '產品內容',
        error: '必填欄位',
        validates: {
            isRequired: true
        }
    },
    product_imageUrl: {
        formType: 'input',
        name: '產品主圖網址',
        type: 'text',
        error: '必填欄位，須符合 url 格式',
        validates: {
            isRequired: true,
            pattern: '^(https://)[^s]+'
        }
    },
    product_imagesUrl: {
        formType: 'input',
        name: '其他產品圖片',
        type: 'text',
        validates: {
            isRequired: false
        }
    },
    product_is_enabled: {
        formType: 'radio',
        name: '是否啟用',
        options: [{
            label: '啟用', value: 1
        },{
            label: '停用', value: 0
        }],
        validates: {
            isRequired: true
        }
    }
};
