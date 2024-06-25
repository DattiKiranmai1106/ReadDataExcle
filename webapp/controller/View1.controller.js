
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        

        return Controller.extend("com.kt.sap.excel.readdataexcel.controller.View1", {
            onInit: function () {
                this.localModel1 = new sap.ui.model.json.JSONModel();
                this.getView().setModel(this.localModel1, "localModel");
                this.localModel2 = new sap.ui.model.json.JSONModel();
                this.getOwnerComponent().setModel(this.localModel2, "localModel2");
            },
            onUpload: function (e) {
                this._import(e.getParameter("files") && e.getParameter("files")[0]);
            },
            _import: function (file) {
                var that = this;
                var excelData = {},headerData={};
                if (file && window.FileReader) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, {type: 'binary' });
                        workbook.SheetNames.forEach(function (sheetName) {
                            // Here is your object for every sheet in workbook
                            if(sheetName==="Header"){
                            headerData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                            }else if(sheetName==="Item"){
                            excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                            }
                        });
                        // Setting the data to the local model 

                        that.localModel1.setData({
                            items: headerData
                        });
                        that.localModel1.refresh(true);

                        that.localModel2.setData({
                            items: excelData
                        });
                        that.localModel2.refresh(true);

                    };
                    reader.onerror = function (ex) {
                        console.log(ex);
                    };
                    reader.readAsBinaryString(file);
                }

            },
            onPressNavView:function(oEvent){
                var sPath = oEvent.getSource().getBindingContext("localModel").getObject().EmpID;
                var oRouter=this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView2", {
                    empID : sPath
                });
            }
        });
    });
