if(typeof(WIDGET_PATH) == "undefined")
	WIDGET_PATH = "";
angular.module("widget", [])
.directive("tableview", function ($filter) {
	return {
		restrict: "E",
		templateUrl: WIDGET_PATH + "widget/tableview.html",
		replace: true,
		scope: {
			fields: "=",
			can_control: "=control",
			input_data_set: "=data",
			callback_update: "=onUpdate"
		},
		link: function (scope, element, attrs)
		{
			scope.data_set = [];
			scope.init_fields = _.cloneDeep(scope.fields);
			scope.is_updating = false;
			
			scope.getInputFromDataSet = function(input_data_set, fields)
			{
				var data_set = []
				for(var j = 0; j < scope.input_data_set.length; j++)
				{
					var row = scope.input_data_set[j];
					var data_row = [];
					for(var i = 0; i < scope.fields.length; i++)
					{
						var field_type = scope.fields[i].type;
						var data_value = row[scope.fields[i].slug];
						data_row.push({slug:scope.fields[i].slug, value: data_value, type:field_type , is_update: false})
					}	
					data_set.push(data_row);

				}	
				return data_set;
			}
			scope.data_set = scope.getInputFromDataSet(scope.input_data_set);

			scope.orderDataSet = function() {
				if(typeof(attrs.orderBy) !="undefined")
				{
					scope.input_data_set = $filter('orderBy')(scope.input_data_set, attrs.orderBy);
					scope.data_set = scope.getInputFromDataSet(scope.input_data_set);
				}
			}
			scope.orderDataSet();

			scope.callBackUpdate = function()
			{
				//scope.$digest();
				if(typeof(attrs.onUpdate) !="undefined")
				{
					scope.callback_update(scope.input_data_set);
				}
			}

			scope.addDataSet = function(fields)
			{		
				var slugs = _(fields).pluck('slug').value();
				var models = _(fields).pluck('model').value();
				var types = _(fields).pluck('slug').value();
				//create array at models size that contain string 'value' 
				var new_models = [];
				for(var i =0; i < models.length; i++)
					new_models.push({slug:slugs[i], value: models[i], type:types[i] , is_update: false});
				scope.data_set.push(new_models);
				

				scope.fields = _.cloneDeep(scope.init_fields);
				setTimeout(function(){angular.element(document.querySelector('.tableview .create-control td input'))[0].focus()}, 200);
				var new_info = _.zipObject(slugs, models);
				scope.input_data_set.push(new_info);
				scope.orderDataSet();
				scope.callBackUpdate();
			}

			scope.deleteDataSet = function(row)
			{
				
				var row_index = _.findIndex(scope.data_set, row);
				scope.data_set.splice(row_index, 1);
				scope.input_data_set.splice(row_index, 1);
				scope.orderDataSet();
				scope.callBackUpdate();
			}

			scope.updateDataSet = function(row)
			{
				console.log('update set')

				_(row).forEach(function(data) {
				 console.log(data); 
				 data.is_update = !data.is_update

				})
				//update input_data_set to current row
				var row_index = _.findIndex(scope.data_set, row);

				for(var i = 0; i < row.length; i++)
					scope.input_data_set[row_index][row[i].slug] = row[i].value
				scope.orderDataSet();
				scope.callBackUpdate();
				
			}

			scope.$watch('input_data_set', function(newValue, oldValue) {
             	scope.data_set = scope.getInputFromDataSet(newValue);

           });

		}
	}
})
.directive("chart", function(){
	return {
		restrict: "E",
		replace: true,
		scope: {
			graph_data: "=data",
			width: "@",
			height: "@"
		},
		compile: function(tElement, tAttrs)
		{
			var chartElement;
			var chartId;
			chartId = tAttrs.id + '-content';
			chartElement = angular.element('<canvas id="' + chartId + '" class="bar-chart" width="' + tAttrs.width +'" height="' + tAttrs.height +'" "></canvas>');
			tElement.append(chartElement);
			return function (scope, element, attrs)
			{
				var ctx = angular.element(document.querySelector('#' + chartId))[0].getContext("2d");
				var isDirtyCheck = false;
				if(attrs.dirtyCheck == "true")
					isDirtyCheck = true;

				scope.$watch('graph_data', function(val, old){
					console.log('update graph')
					scope.chart = new Chart(ctx)[attrs.type](scope.graph_data);
				}, isDirtyCheck)

				//scope.chart = new Chart(ctx)[attrs.type](scope.getGraphData(scope.graph_data));
			}
		}
	}
})
.directive("barchart", function () {
	
	return {
		restrict: "E",
		replace: true,
		scope: {
			input_data: "=data",
			width: "@",
			height: "@"
		},
		compile: function (tElement, tAttrs)
		{
		
			var chartElement;
			var chartId;
			chartId = tAttrs.id + '-content';
			chartElement = angular.element('<canvas id="' + chartId + '" class="bar-chart" width="' + tAttrs.width +'" height="' + tAttrs.height +'" "></canvas>');
			tElement.append(chartElement);

			//return post link
			return function (scope, element, attrs)
			{
				var ctx = angular.element(document.querySelector('#' + chartId))[0].getContext("2d");
			
				scope.getGraphData = function(data)
				{
					
						//data is array of object
						var labels = _(data).pluck(attrs.x).value();
						var y_data = _(data).pluck(attrs.y).value();
						var single_data_set = {
							animation:false,
				            fillColor: "rgba(220,220,220,0.2)",
				            strokeColor: "rgba(220,220,220,1)",
				            highlightFill: "#fff",
				            highlightStroke: "rgba(220,220,220,1)",
							"data":y_data
						}
						if(typeof(attrs.fillColor) == "string")
							single_data_set.fillColor  = attrs.fillColor;
						if(typeof(attrs.strokeColor) == "string")
							single_data_set.strokeColor = attrs.strokeColor;
						if(typeof(attrs.pointColor) == "string")
							single_data_set.pointColor = attrs.pointColor;
						if(typeof(attrs.pointStrokeColor) == "string")
							single_data_set.pointStrokeColor = attrs.pointStrokeColor;
						if(typeof(attrs.highlightFill) == "string")
							single_data_set.highlightFill = attrs.highlightFill;
						if(typeof(attrs.highlightStroke) == "string")
							single_data_set.highlightStroke = attrs.highlightStroke;
						var graph_data = {
							labels: labels,
							datasets: [
								single_data_set
							]
						}
					return graph_data;
				}

				var isDirtyCheck = false;
				if(attrs.dirtyCheck == "true")
					isDirtyCheck = true;

				scope.$watch('input_data', function(val, old){
					console.log('update graph')
					scope.chart = new Chart(ctx).Bar(scope.getGraphData(val));
				}, isDirtyCheck)

				//scope.chart = new Chart(ctx).Bar(scope.getGraphData(scope.input_data));
				
			};
		}
		 
	}
});