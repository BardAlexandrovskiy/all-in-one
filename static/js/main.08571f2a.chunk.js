(this["webpackJsonpall-in-one"]=this["webpackJsonpall-in-one"]||[]).push([[0],{40:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(20),s=n.n(r),i=n(6),l=n(10),o=n(11),u=n(13),d=n(12),j=n(15),h=n(2),b=n(8),O=n(9),p=(n(40),n(1)),f=function(){return Object(p.jsx)("footer",{className:"footer",children:Object(p.jsx)("div",{className:"container footer-container",children:Object(p.jsx)("nav",{className:"nav-menu",children:Object(p.jsxs)("ul",{children:[Object(p.jsx)("li",{children:Object(p.jsxs)(j.b,{to:"/",children:[Object(p.jsx)(b.a,{icon:O.e}),"\u0413\u043b\u0430\u0432\u043d\u0430\u044f"]})}),Object(p.jsx)("li",{children:Object(p.jsxs)(j.b,{to:"/news",children:[Object(p.jsx)(b.a,{icon:O.g}),"\u041d\u043e\u0432\u043e\u0441\u0442\u0438"]})}),Object(p.jsx)("li",{children:Object(p.jsxs)(j.b,{to:"/weather",children:[Object(p.jsx)(b.a,{icon:O.d}),"\u041f\u043e\u0433\u043e\u0434\u0430"]})}),Object(p.jsx)("li",{children:Object(p.jsxs)(j.b,{to:"/tasks",children:[Object(p.jsx)(b.a,{icon:O.f}),"\u0417\u0430\u0434\u0430\u0447\u0438"]})})]})})})})},v=(n(42),function(){return Object(p.jsx)("div",{className:"main-screen screen",children:"MainScreen"})}),k=function(){return Object(p.jsx)("div",{className:"news-screen",children:"NewsScreen"})},m=function(){return Object(p.jsx)("div",{className:"weather-screen",children:"WeatherScreen"})},x="\u0412\u0441\u0435",g="all",T="\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435",N="active",V="\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u044b\u0435",w="completed",C=(n(43),"ADD_NEW_TASK"),y="TOGGLE_TASK",I="DELETE_TASK",E="CHANGE_TASK_FILTER",S="CHANGE_SEARCH_TASKS_INPUT_VALUE",A="CHANGE_ADD_TASK_INPUT_VALUE",D="CHECK_ALL_TASKS",_="DELETE_COMPLETED_TASKS",L="EDIT_TASK",K=(n(44),{changeTaskFilter:function(e){return function(e){return{type:E,payload:{filter:e}}}(e)}}),B=Object(i.b)((function(e){return{filter:e.toDo.filter}}),K)((function(e){var t=e.name,n=e.title,a=e.changeTaskFilter,c=e.filter,r="".concat(t===c?t+" current":t," button tasks-filter-button");return Object(p.jsx)("button",{onClick:function(){return a(t)},className:r,children:n})})),P=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).handleChangeInput=function(t){(0,e.props.changeSearchTasksInputValue)(t.target.value)},e.handleClickClearButton=function(){(0,e.props.changeSearchTasksInputValue)("")},e}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props,t=e.tasksList,n=e.searchTasksInputValue,a=e.checkAllTasks,c=e.deleteCompletedTasks,r=!1,s=0;return t.forEach((function(e){e.check?r=!0:s+=1})),Object(p.jsxs)("header",{className:"tasks-header".concat(t.length?" show":""),children:[Object(p.jsx)("div",{className:"search",children:Object(p.jsx)("div",{className:"container",children:Object(p.jsxs)("div",{className:"input-wrapper",children:[Object(p.jsx)("div",{onClick:this.handleClickClearButton,className:"clear-input".concat(n?" show":""),children:Object(p.jsx)(b.a,{icon:O.a})}),Object(p.jsx)("input",{onChange:this.handleChangeInput,type:"text",placeholder:"\u041f\u043e\u0438\u0441\u043a",value:n})]})})}),Object(p.jsx)("div",{className:"bottom-side",children:Object(p.jsxs)("div",{className:"container",children:[Object(p.jsxs)("div",{className:"column left-column",children:[Object(p.jsx)("div",{onClick:a,className:"button check-all-button".concat(t.length&&!s?" green":""),children:Object(p.jsx)(b.a,{icon:O.c})}),Object(p.jsxs)("div",{className:"counter",children:["\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435: ",s]})]}),Object(p.jsx)("div",{className:"column center-column",children:Object(p.jsxs)("div",{className:"filters-wrapper",children:[Object(p.jsx)(B,{name:g,title:x}),Object(p.jsx)(B,{name:N,title:T}),Object(p.jsx)(B,{name:w,title:V})]})}),Object(p.jsx)("div",{className:"column right-column",children:r&&Object(p.jsx)("div",{onClick:c,className:"button delete-completed-button",children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u044b\u0435"})})]})})]})}}]),n}(c.a.Component),F={changeSearchTasksInputValue:function(e){return function(e){return{type:S,payload:{value:e}}}(e)},checkAllTasks:function(){return{type:D}},deleteCompletedTasks:function(){return{type:_}}},G=Object(i.b)((function(e){var t=e.toDo;return{tasksList:t.list,searchTasksInputValue:t.searchTasksInputValue}}),F)(P),H=(n(45),n(27)),U=function(e){var t=e.otherValue,n=e.hightlightValue;return Object(p.jsxs)(p.Fragment,{children:[t,Object(p.jsx)("span",{className:"hightlight",children:n})]})},W=function(e){var t=e.searchValue,n=e.string;if(!t)return n;var a=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(a,"gi"),r=n.match(c);return r?n.split(c).map((function(e,t,a){if(t<a.length-1){var c=r.shift();return Object(p.jsx)(U,{hightlightValue:c,otherValue:e},t+n)}return e})):void 0},J=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).handleClickValue=function(){var e=a.props.value;a.setState({isShowEditValue:!0,editorValue:e})},a.handleChangeEditor=function(e){console.log(e.target.value),a.setState({editorValue:e.target.value})},a.addNewValue=function(){var e=a.props,t=e.editTask,n=e.id,c=a.state.editorValue;c.trim()?(t({id:n,value:c}),a.setState({isShowEditValue:!1})):a.setState({isShowEditValue:!1,editorValue:""})},a.handlePressEditor=function(e){13===e.which&&a.addNewValue()},a.handleBlurEditor=function(){a.addNewValue()},a.handleFocusEditor=function(e){var t=e.target.value;e.target.value="",e.target.value=t},a.state={isShowEditValue:!1,editorValue:""},a}return Object(o.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.value,a=t.check,c=t.id,r=t.toggleTask,s=t.deleteTask,i=t.searchInputValue,l=this.state,o=l.isShowEditValue,u=l.editorValue;return Object(p.jsxs)("li",{className:"tasks-item".concat(a?" checked":""),id:c,children:[Object(p.jsx)("div",{className:"check-button",onClick:function(){return r(c)},children:Object(p.jsx)(b.a,{icon:O.b})}),Object(p.jsx)("div",{className:"value",children:o?Object(p.jsx)(H.a,{placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043e\u0442\u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u0443\u044e \u0437\u0430\u0434\u0430\u0447\u0443",onFocus:this.handleFocusEditor,autoFocus:!0,onChange:this.handleChangeEditor,onKeyPress:this.handlePressEditor,className:"inner editor",onBlur:this.handleBlurEditor,value:u}):Object(p.jsx)("div",{className:"inner",onClick:function(){return e.handleClickValue()},children:Object(p.jsx)(W,{searchValue:i,string:n})})}),Object(p.jsx)("div",{className:"delete-button",onClick:function(){return s(c)},children:Object(p.jsx)(b.a,{icon:O.i})})]})}}]),n}(c.a.Component),R={deleteTask:function(e){return function(e){return{type:I,payload:{id:e}}}(e)},toggleTask:function(e){return function(e){return{type:y,payload:{id:e}}}(e)},editTask:function(e){return function(e){return{type:L,payload:e}}(e)}},M=Object(i.b)((function(e){return{searchInputValue:e.toDo.searchTasksInputValue}}),R)(J),$=(n(46),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props,t=e.tasksList,n=e.filter,a=e.searchInputValue;return Object(p.jsx)("main",{className:"tasks-main",children:Object(p.jsx)("div",{className:"tasks-list",children:Object(p.jsx)("div",{className:"container",children:Object(p.jsx)("ul",{children:t.filter((function(e){switch(n){case N:return!e.check;case w:return e.check;default:return e}})).filter((function(e){if(a){var t=a.toLowerCase();return!!e.value.toLowerCase().includes(t)}return e})).map((function(e){var t=e.check,n=e.value,a=e.id;return Object(p.jsx)(M,{check:t,value:n,id:a},a)}))})})})})}}]),n}(c.a.Component)),q=Object(i.b)((function(e){return{tasksList:e.toDo.list,filter:e.toDo.filter,searchInputValue:e.toDo.searchTasksInputValue}}))($),z=(n(47),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).handleChangeInput=function(t){(0,e.props.changeAddTaskInputValue)(t.target.value)},e.handlePressInput=function(t){var n=e.props,a=n.addTaskInputValue,c=n.changeAddTaskInputValue;"Enter"===t.key&&a.trim()&&((0,e.props.addNewTask)(a),c(""))},e.handleClickButton=function(){var t=e.props,n=t.changeAddTaskInputValue,a=t.addTaskInputValue;a.trim()&&((0,e.props.addNewTask)(a),n(""))},e}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props.addTaskInputValue;return Object(p.jsx)("footer",{className:"tasks-footer",children:Object(p.jsx)("div",{className:"container",children:Object(p.jsxs)("div",{className:"input-wrapper",children:[Object(p.jsx)("input",{onKeyPress:this.handlePressInput,onChange:this.handleChangeInput,value:e,type:"text",placeholder:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443"}),e&&Object(p.jsx)("button",{onClick:this.handleClickButton,className:"button",children:Object(p.jsx)(b.a,{icon:O.h})})]})})})}}]),n}(c.a.Component)),Q={addNewTask:function(e){return function(e){return{type:C,payload:{value:e}}}(e)},changeAddTaskInputValue:function(e){return function(e){return{type:A,payload:{value:e}}}(e)}},X=Object(i.b)((function(e){return{addTaskInputValue:e.toDo.addTaskInputValue}}),Q)(z),Y=(n(48),function(){return Object(p.jsxs)("div",{className:"screen tasks-screen",children:[Object(p.jsx)(G,{}),Object(p.jsx)(q,{}),Object(p.jsx)(X,{})]})}),Z=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).componentDidUpdate=function(){var t=e.props.store;console.log(t),localStorage.setItem("all-in-one",JSON.stringify(t))},e}return Object(o.a)(n,[{key:"render",value:function(){return Object(p.jsxs)(j.a,{children:[Object(p.jsxs)(h.c,{children:[Object(p.jsx)(h.a,{path:"/",element:Object(p.jsx)(v,{})}),Object(p.jsx)(h.a,{path:"/news",element:Object(p.jsx)(k,{})}),Object(p.jsx)(h.a,{path:"/weather",element:Object(p.jsx)(m,{})}),Object(p.jsx)(h.a,{path:"/tasks",element:Object(p.jsx)(Y,{})})]}),Object(p.jsx)(f,{})]})}}]),n}(c.a.Component),ee=Object(i.b)((function(e){return{store:e}}))(Z),te=n(16),ne=n(25),ae=n(4),ce=JSON.parse(localStorage.getItem("all-in-one")),re=(ce=ce?ce.toDo:null)||{list:[],filter:g,searchTasksInputValue:"",addTaskInputValue:""};var se=Object(te.combineReducers)({toDo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload,c=e.list;switch(n){case C:return Object(ae.a)(Object(ae.a)({},e),{},{list:c.concat({value:a.value,check:!1,id:Date.now()})});case y:return Object(ae.a)(Object(ae.a)({},e),{},{list:c.map((function(e){return e.id===a.id?Object(ae.a)(Object(ae.a)({},e),{},{check:!e.check}):e}))});case I:return Object(ae.a)(Object(ae.a)({},e),{},{list:c.filter((function(e){return e.id!==a.id}))});case E:return Object(ae.a)(Object(ae.a)({},e),{},{filter:a.filter});case S:return Object(ae.a)(Object(ae.a)({},e),{},{searchTasksInputValue:a.value});case A:return Object(ae.a)(Object(ae.a)({},e),{},{addTaskInputValue:a.value});case D:var r=!1;return c.forEach((function(e){e.check||(r=!0)})),Object(ae.a)(Object(ae.a)({},e),{},{list:c.map((function(e){return Object(ae.a)(Object(ae.a)({},e),{},{check:r})}))});case _:return Object(ae.a)(Object(ae.a)({},e),{},{list:c.filter((function(e){return!e.check}))});case L:return Object(ae.a)(Object(ae.a)({},e),{},{list:c.map((function(e){var t=a.id,n=a.value;return e.id===t&&(e.value=n),e}))});default:return e}}}),ie=n(26),le=n.n(ie),oe=Object(te.createStore)(se,Object(ne.composeWithDevTools)(Object(te.applyMiddleware)(le.a))),ue=function(){return Object(p.jsx)(i.a,{store:oe,children:Object(p.jsx)(ee,{})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(49);s.a.render(Object(p.jsx)(ue,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.08571f2a.chunk.js.map