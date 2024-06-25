sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.kt.sap.excel.readdataexcel.controller.View2", {
        onInit: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView2").attachMatched(this._onRouteMatched, this);

        },
        
        _onRouteMatched:function(oEvent) {
            var sArg = oEvent.getParameter("arguments").empID;
            var oData = this.getOwnerComponent().getModel("localModel2").getData();
            var oModel = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel,"oExpModel");
            var oFilter=new sap.ui.model.Filter("EmpID",sap.ui.model.FilterOperator.EQ, sArg);
            this .byId("tableforView2").getBinding("items").filter(oFilter);

        },
        onNavigationView1:function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView1");
           
        },
      });
    }
  );