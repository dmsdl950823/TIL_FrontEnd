```js
  /**
  * 직렬화된 템플릿을 트리화 시킵니다
  */
  deSerializeTemplate (templates) {
  // disabled 설정
  const disabledOnly = [
    [0, 1], // Create
    [2, 3, 4], // Create, Delete
    [5], // Create, Read, Update
    [15], // Update, Delete
    [18] // Create, Update, Delete
  ]

  // depth 설정
  const setDepth = [0, 1, 2, 2, 2, 2, 1, 2, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0]

  templates.forEach((template, index) => {
    // 해당하는 것만 disabled 설정
    for (let i = 0; i < disabledOnly.length; i++) {
      const check = disabledOnly[i].indexOf(index)

      if (check >= 0) {
        if (i === 0) {
          template.isCreate = 'disabled'
        }
        if (i === 1) {
          template.isCreate = 'disabled'
          template.isDelete = 'disabled'
        }
        if (i === 2) {
          template.isCreate = 'disabled'
          template.isRead = 'disabled'
          template.isUpdate = 'disabled'
        }

        if (i === 3) {
          template.isUpdate = 'disabled'
          template.isDelete = 'disabled'
        }
        if (i === 4) {
          template.isCreate = 'disabled'
          template.isUpdate = 'disabled'
          template.isDelete = 'disabled'
        }
      }
    }

    Object.defineProperty(template, 'depth', {
      value: setDepth[index],
      writable: false
    })
  })

  console.log(templates)

  return templates
  },
```

``` js
// input
DATAFORMAT: [
    { apiName: 'A', isCreate: 'disabled', isRead: false, isUpdate: false, isDelete: false, indeterminate: false },
    { apiName: 'B', isCreate: 'disabled', isRead: false, isUpdate: false, isDelete: false, indeterminate: false },
    { apiName: 'C', isCreate: 'disabled', isRead: false, isUpdate: false, isDelete: 'disabled' },
    { apiName: 'D', isCreate: 'disabled', isRead: false, isUpdate: false, isDelete: 'disabled' },
    { apiName: 'E', isCreate: 'disabled', isRead: false, isUpdate: false, isDelete: 'disabled' },
    { apiName: 'F', isCreate: 'disabled', isRead: 'disabled', isUpdate: 'disabled', isDelete: false },
    { apiName: 'G', isCreate: false, isRead: false, isUpdate: false, isDelete: false, indeterminate: false },
    { apiName: 'H', isCreate: false, isRead: false, isUpdate: false, isDelete: false },
    { apiName: 'I', isCreate: false, isRead: false, isUpdate: false, isDelete: false },
    { apiName: 'K', isCreate: false, isRead: false, isUpdate: false, isDelete: false },
    { apiName: 'M', isCreate: false, isRead: false, isUpdate: false, isDelete: false },
    { apiName: 'N', isCreate: false, isRead: false, isUpdate: false, isDelete: false },
    { apiName: 'O', isCreate: false, isRead: false, isUpdate: false, isDelete: false },
    { apiName: 'Q', isCreate: false, isRead: false, isUpdate: 'disabled', isDelete: 'disabled' },
    { apiName: 'P', isCreate: false, isRead: false, isUpdate: false, isDelete: false, range: 'all' },
    { apiName: 'R', isCreate: false, isRead: false, isUpdate: false, isDelete: false, range: 'all' },
    { apiName: 'S', isCreate: 'disabled', isRead: false, isUpdate: 'disabled', isDelete: 'disabled' }
  ]
```


``` js
// 만들고자 하는 형태
DATAFORMAT: [
    {
      apiName: 'A',
      isCreate: 'disabled',
      isRead: false,
      isUpdate: false,
      isDelete: false,
      indeterminate: false,
      children: [
        {
          apiName: 'B',
          isCreate: 'disabled',
          isRead: false,
          isUpdate: false,
          isDelete: false,
          indeterminate: false,
          children: [
            { apiName: 'C', isCreate: 'disabled', isRead: false, isUpdate: false, isDelete: 'disabled' },
            { apiName: 'D', isCreate: 'disabled', isRead: false, isUpdate: false, isDelete: 'disabled' },
            { apiName: 'E', isCreate: 'disabled', isRead: false, isUpdate: false, isDelete: 'disabled' },
            { apiName: 'F', isCreate: 'disabled', isRead: 'disabled', isUpdate: 'disabled', isDelete: false }
          ]
        },
        {
          apiName: 'G',
          isCreate: false,
          isRead: false,
          isUpdate: false,
          isDelete: false,
          indeterminate: false,
          children: [
            { apiName: 'H', isCreate: false, isRead: false, isUpdate: false, isDelete: false }
          ]
        }
      ]
    },
    {
      apiName: 'I',
      isCreate: false,
      isRead: false,
      isUpdate: false,
      isDelete: false,
      children: [
        { apiName: 'K', isCreate: false, isRead: false, isUpdate: false, isDelete: false },
        { apiName: 'M', isCreate: false, isRead: false, isUpdate: false, isDelete: false },
        { apiName: 'N', isCreate: false, isRead: false, isUpdate: false, isDelete: false },
        { apiName: 'O', isCreate: false, isRead: false, isUpdate: false, isDelete: false },
        { apiName: 'Q', isCreate: false, isRead: false, isUpdate: 'disabled', isDelete: 'disabled' }
      ]
    },
    {
      apiName: 'P',
      isCreate: false,
      isRead: false,
      isUpdate: false,
      isDelete: false,
      range: 'all'
    },
    {
      apiName: 'R',
      isCreate: false,
      isRead: false,
      isUpdate: false,
      isDelete: false,
      range: 'all'
    },
    {
      apiName: 'S',
      isCreate: 'disabled',
      isRead: false,
      isUpdate: 'disabled',
      isDelete: 'disabled'
    }
  ]
```