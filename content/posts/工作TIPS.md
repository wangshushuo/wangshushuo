---
title: 工作TIPS url: /工作TIPS.html date: 2020-12-18T13:46:12+08:00 description: 记录各种工作中的代码，提高效率 categories:

- 工作

---

## go

### 为表单加一个字段

![](http://hugo-1256216240.cos.ap-chengdu.myqcloud.com/pasteimageintomarkdown/2022-05-16/53911817974500.png)

```go
// 自定义field中间件
func NewCustomizedFieldMiddlewares() form_context.FormMiddlewares {
	return new(customizedFieldMiddlewares)
}

type customizedFieldMiddlewares struct{}

func (r *customizedFieldMiddlewares) Register(ctx form_context.FormContext) {
	ctx.GetResponsePipeline().Add(r.HandleResponse)
}

// ctx的metadataApi可以加一个field（主表子表）
func (r *customizedFieldMiddlewares) HandleResponse(ctx form_context.FormContext, res *context.BizFormConfigResponse) *context.BizFormConfigResponse {
	isMobile := ctx.GetSolution().FormTemplate.IsMobile
	if isMobile == true {
		return res
	}
	addMasterFields(ctx)
	return res
}

// 定义field
func addMasterFields(ctx form_context.FormContext) {
	api := ctx.GetMetadataApi()
	item := form_context.FormMasterFieldParams{
		MetadataField: metadata.Field{
			Path:           "project",
			DisplayName:    "项目编码",
			IsContextField: true,
			Required:       true,
			Readonly:       false,
			IsExtend:       true,
			IsExtendField:  true,
			ExtendInfo: &metadata.ExtendInfo{
				Type:      "String",
				ReferType: "Project",
				EnumType:  "",
				IsMulti:   false,
				IsSubmit:  false,
				Precision: 0,
			},
		},
		TemplateField: template.Field{
			FieldBase: template.FieldBase{
				Extended:    true,
				Path:        "project",
				Required:    true,
				DisplayName: "项目编码",
			},
			Colspan: 1,
			Rowspan: 1,
		},
		SectionIndex: 0,
		InsertIndex:  6,
	}
	api.AddMasterField(item)
}

```

{"quickSearchFields":null,"fileName":"WorkforceResource-uFGva.json","name":"custom-object-bill-refer","entityName":"
WorkforceResource","displayField":"name","multi":false,"displayMode":"list","listOptions":{},"gridOptions":{"
gridColumnsName":""},"treeOptions":{},"advanceEnabled":true,"advanceOptions":{"gridColumnsName":"
custom-object-bill-list"}}