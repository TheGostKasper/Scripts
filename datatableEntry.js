﻿function DataTableEntry() {
   
    function bindDataTable(tableId, targets, renderFn, ajaxEndPoint, ajaxType, ajaxData, columns, initComplete) {
        console.log(WeeloApi + ajaxEndPoint);
        var ajax = basicAjaxConfig(WeeloApi + ajaxEndPoint, ajaxType, tableId, ajaxData)
        return basicConfig(tableId, targets, renderFn, ajax, columns, initComplete);
    }
    function bindGroupDataTable(tableId, indx, rowGroup, targets, renderFn, ajaxEndPoint, ajaxType, ajaxData, columns,initComplete) {
        return $(tableId).DataTable({
            dom: 'Bfrtip',
            buttons: [
                'print'
            ],
            processing: true,
            serverSide: true,
            columnDefs: [{
                searchable: false,
                sortable: false,
                targets: targets,
                render: renderFn
            }],
            //dom: 'Bfrtip',
            buttons: [
                'copy', 'excel', 'pdf'
            ],
            language: {
                processing: '<img src="~/Content/loader.gif" />'
            },
            ajax: {
                url: WeeloApi + ajaxEndPoint,
                type: ajaxType,
                scrollX: true,
                data: function (d) {
                    var info = $(tableId).DataTable().page.info();
                    ajaxData.page = info.page + 1;
                    ajaxData.pageSize = d.length;
                    return ajaxData;
                },
                dataType: "json",
                cache: false,
                headers: requestHeaders(),
                dataFilter: function (data) {
                    var returnedDataTable = jQuery.parseJSON(data);
                    if (returnedDataTable && returnedDataTable.data != null) {
                        var json = {};
                        json.recordsTotal = returnedDataTable.data.total;
                        json.recordsFiltered = returnedDataTable.data.total;
                        json.data = returnedDataTable.data.data;//arr;
                        return JSON.stringify(json); // return JSON string
                    }
                    else {
                        $('.pg-notfound').show();
                        //   $('#ready_orders_wrapper').hide();
                        var json = {};
                        json.recordsTotal = 0;
                        json.recordsFiltered = 0;
                        json.data = '';
                        return JSON.stringify(json);
                    }
                }
            },
            initComplete: initComplete,
            columns: columns,
            order: [[indx, 'desc']],
            rowGroup: rowGroup
        });

    }
  
    function bindDataTableAction(tableId, targets, renderFn, ajaxEndPoint, ajaxType, ajaxData, columns) {
        var ajax = basicAjaxConfig(ajaxEndPoint, ajaxType, tableId, ajaxData)
        return basicConfig(tableId, targets, renderFn, ajax, columns)
    }

    function basicConfig(tableId, targets, renderFn, ajaxObj, columns, initComplete) {
        return $(tableId).DataTable({
            processing: true,
            serverSide: true,
            searching: false,
            columnDefs: [{
                searchable: false,
                sortable: false,
                targets: targets,
                render: renderFn
            }],
            //dom: 'Bfrtip',
            buttons: [
                'copy', 'excel', 'pdf'
            ],
            language: {
                processing: '<img src="Content/loader.gif" />'
            },
            ajax: ajaxObj,
            initComplete: initComplete,
            columns: columns
        });
    }

    function basicAjaxConfig(ajaxEndPoint, ajaxType, tableId, ajaxData) {
        return {
            url: ajaxEndPoint,
            type: ajaxType,
            scrollX: true,
            data: function (d) {
                var info = $(tableId).DataTable().page.info();
                ajaxData.page = info.page + 1;
                ajaxData.pageSize = d.length;
                return ajaxData;
            },
            dataType: "json",
            cache: false,
            headers: requestHeaders(),
            dataFilter: function (data) {
                var returnedDataTable = jQuery.parseJSON(data);
                console.log(returnedDataTable.data);
                if (returnedDataTable && returnedDataTable.data != null) {
                    var json = {};
                    json.recordsTotal = returnedDataTable.data.total;
                    json.recordsFiltered = returnedDataTable.data.total;
                    json.data = returnedDataTable.data.data;//arr;
                    return JSON.stringify(json); // return JSON string
                }
                else {
                    $('.pg-notfound').show();
                    var json = {};
                    json.recordsTotal = 0;
                    json.recordsFiltered = 0;
                    json.data = '';
                    return JSON.stringify(json);
                }
            }
        }
    }




      function getDate(myDate) {
        return myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " "
        + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
    }

    this.bindDataTable = bindDataTable;
    this.bindGroupDataTable = bindGroupDataTable;
    this.bindDataTableAction = bindDataTableAction;
    this.getStringDate = getDate;
};