 $(document).ready(function() {
     var _dt = new DataTableEntry();
     var datatable;
     if (datatable) datatable.destroy();
     datatable = _dt.bindDataTable('#employeeList', [0, 1, 2, 3, 4, 5],
         function (data, a, b, c) {
             
             if (c.col == 4) {
                
                 var orderTime = moment.utc(data).toDate();
                 return moment(orderTime).format('DD/MM/YYYY hh:mm:ss A')
             }
             if (c.col == 5)
                 return '<div class="pull-right"> <a class="btn btn-secondary btn--icon-text" href="/admin/employee/Edit/' + b.id + '"><span><i class="zmdi zmdi-edit zmdi-hc-fw"></i></span></a><a class="btn btn-danger btn--icon-text" data-did="'+b.id+'" href="/admin/employee/Delete/' + b.id + '"><span><i class="zmdi zmdi-delete zmdi-hc-fw"></i></span></a></div>'
             else
                 return data;
         }, 'admin/employee', 'POST', {}, [
             //{ "data": "id" },
             { "data": "name" },
             { "data": "mobile" },
             { "data": "email" },
             { "data": "address" },
             { "data": "creationDate" }
         ]);
     $('#employeeList').on('draw.dt', function () {
         data = $('#employeeList tbody tr');
     });

     $('input').on('keyup', function (e) {
         var searchVal = $(this).val();
         var objArr = [];
         for (var i = 0; i < data.length; i++) {
             if (data[i].cells[0].innerText.includes(searchVal)) objArr.push(data[i]);
         }
         if (objArr.length == 0) objArr.push('<tr><td colspan="9" class="dataTables_empty">No Match</td></tr>')
         $('#employeeList tbody').empty();
         for (var i = 0; i < objArr.length; i++) {
             $('#employeeList tbody').append(objArr[i]);
         }
         $('#employeeList tbody').html(objArr);
     });
 });