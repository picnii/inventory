angular.module("component", [])
.directive("groupbill", function () {
	return {
		restrict: "E",
		templateUrl: "component/home/groupbill.html",
		replace: true,
		scope: {
			text: "@",
			selected: "=",
			callback_select: "=onSelected",
			callback_un_select: "=onUnSelected"
		},
		link: function (scope, element, attrs)
		{
			console.log(attrs);
			console.log(scope)
			scope.updateSelected = function(){
				if(typeof(attrs.selected) == 'undefined' || attrs.selected == 'false' )
					scope.isSelected = false;
				else
				{
					scope.isSelected = true;
					element.toggleClass('active');
				}
			}	

			scope.do_callback_event = function()
			{
				console.log('callback');
				console.log(scope.isSelected)
				console.log(scope.callback_select)
				if(scope.isSelected && _.isFunction(scope.callback_select))
					scope.callback_select();
				if(!scope.isSelected && _.isFunction(scope.callback_un_select))
					scope.callback_un_select();
			}

			scope.doUpdate = function()
			{
			
				element.toggleClass('active');
				scope.isSelected = !scope.isSelected;
				scope.selected = scope.isSelected ;
				//console.log(scope.isSelected)
				scope.do_callback_event();
				
			}

			scope.updateSelected();
			scope.$watch('selected', function(newValue, oldValue){
				scope.isSelected = newValue;
				if(scope.isSelected)
					element.addClass('active')
				else
					element.removeClass('active');
				//scope.do_callback_event();
			})

		}
	}
});;