(this["webpackJsonpall-in-one"]=this["webpackJsonpall-in-one"]||[]).push([[0],{48:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(16),s=n.n(r),i=n(5),u=n(20),o=n(2),l=n(11),j=n(12),h=(n(48),n(1)),d=function(){return Object(h.jsx)("footer",{className:"footer",children:Object(h.jsx)("div",{className:"container footer-container",children:Object(h.jsx)("nav",{className:"nav-menu",children:Object(h.jsxs)("ul",{children:[Object(h.jsx)("li",{children:Object(h.jsxs)(u.b,{to:"/",children:[Object(h.jsx)(l.a,{icon:j.f}),"Main"]})}),Object(h.jsx)("li",{children:Object(h.jsxs)(u.b,{to:"/news",children:[Object(h.jsx)(l.a,{icon:j.i}),"News"]})}),Object(h.jsx)("li",{children:Object(h.jsxs)(u.b,{to:"/weather",children:[Object(h.jsx)(l.a,{icon:j.e}),"Weather"]})}),Object(h.jsx)("li",{children:Object(h.jsxs)(u.b,{to:"/tasks",children:[Object(h.jsx)(l.a,{icon:j.g}),"Tasks"]})})]})})})})},b=n(6),O=n(7),p=n(8),f=n(9),m=(n(50),function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(){return Object(b.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"render",value:function(){return Object(h.jsx)("div",{className:"main-screen screen",children:"MainScreen"})}}]),n}(c.a.Component)),v=m,k=function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(){return Object(b.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(h.jsx)("div",{className:"news-screen screen"})}}]),n}(c.a.Component),x=k,g="SET_LOCATION_BY_IP",y=function(){return function(e){fetch("https://api.ipify.org?format=json").then((function(e){if(200===e.status)return e.json();throw new Error(e.status)})).then((function(e){return e.ip})).then((function(t){fetch("https://api.sypexgeo.net/json/".concat(t)).then((function(e){if(200===e.status)return e.json();throw new Error(e.status)})).then((function(t){var n;e((n=t.city.name_en,{type:g,payload:{city:n}}))}))}))}},T=(n(51),function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(){return Object(b.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"render",value:function(){var e=this.props.currentCity;return Object(h.jsx)("header",{className:"weather-header",children:Object(h.jsx)("div",{className:"header-container container",children:Object(h.jsxs)("div",{className:"current-city",children:[e||"Locating...",Object(h.jsx)(l.a,{icon:j.h})]})})})}}]),n}(c.a.Component)),N=Object(i.b)((function(e){return{currentCity:e.weather.currentLocation.city}}))(T),C=(n(52),function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(b.a)(this,n),(a=t.call(this,e)).state={weather:null},a}return Object(O.a)(n,[{key:"componentDidMount",value:function(){var e,t=this,n=this.props.currentCity;(e=n,fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(e,"&appid=12c7488f70bcd015f75b9a10d559d91f&units=metric")).then((function(e){if(200===e.status)return e.json();throw new Error(e.status)})).then((function(e){var t=e.main.temp,n=e.clouds.all;return{temp:Math.round(t),cloudiness:n}}))).then((function(e){return t.setState({weather:e})}))}},{key:"render",value:function(){var e=this.state.weather;return Object(h.jsx)("div",{className:"weather-info-item",children:e?e.temp:""})}}]),n}(c.a.Component)),w=Object(i.b)(null)(C),E=(n(53),function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(){return Object(b.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"render",value:function(){var e=this.props.currentCity;return Object(h.jsx)("div",{className:"weather-main",children:Object(h.jsx)("div",{className:"weather-info-list",children:!!e&&Object(h.jsx)(w,{currentCity:e})})})}}]),n}(c.a.Component)),V=Object(i.b)((function(e){return{currentCity:e.weather.currentLocation.city}}))(E),I=(n(54),function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(){return Object(b.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.getCurrentLocation;e.currentCity||t()}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"weather-screen screen",children:[Object(h.jsx)(N,{}),Object(h.jsx)(V,{})]})}}]),n}(c.a.Component)),S={getCurrentLocation:function(){return y()}},L=Object(i.b)((function(e){return{currentCity:e.weather.currentLocation.city}}),S)(I),A=n(65),_=(n(55),"ADD_NEW_TASK"),B="TOGGLE_TASK",D="DELETE_TASK",F="CHANGE_TASK_FILTER",K="CHANGE_SEARCH_TASKS_INPUT_VALUE",R="CHANGE_ADD_TASK_INPUT_VALUE",M="CHECK_ALL_TASKS",P="DELETE_COMPLETED_TASKS",U="EDIT_TASK",G=function(e){return{type:R,payload:{value:e}}},H=function(e){return{type:F,payload:{filter:e}}},J=function(e){return{type:K,payload:{value:e}}},W=function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(b.a)(this,n);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).handleChangeInput=function(t){(0,e.props.changeSearchTasksInputValue)(t.target.value)},e.handleClickClearButton=function(){(0,e.props.changeSearchTasksInputValue)("")},e}return Object(O.a)(n,[{key:"render",value:function(){var e=this.props,t=e.tasksList,n=e.searchTasksInputValue,a=e.checkAllTasks,c=e.deleteCompletedTasks,r=!1,s=0;return t.forEach((function(e){e.check?r=!0:s+=1})),Object(h.jsx)(A.a,{in:!!t.length,timeout:300,unmountOnExit:!0,mountOnEnter:!0,children:Object(h.jsxs)("header",{className:"tasks-header",children:[Object(h.jsx)("div",{className:"search",children:Object(h.jsx)("div",{className:"container search-container",children:Object(h.jsxs)("div",{className:"input-wrapper",children:[Object(h.jsx)(A.a,{in:!!n,timeout:300,unmountOnExit:!0,mountOnEnter:!0,children:Object(h.jsx)("div",{onClick:this.handleClickClearButton,className:"clear-input",children:Object(h.jsx)(l.a,{icon:j.b})})}),Object(h.jsx)("input",{onChange:this.handleChangeInput,type:"text",placeholder:"Search",value:n})]})})}),Object(h.jsx)("div",{className:"bottom-side",children:Object(h.jsxs)("div",{className:"container bottom-container",children:[Object(h.jsxs)("div",{className:"column left-column",children:[Object(h.jsx)("div",{onClick:a,className:"button check-all-button".concat(t.length&&!s?" green":""),children:Object(h.jsx)(l.a,{icon:j.d})}),Object(h.jsxs)("div",{className:"counter",children:["Active: ",s]})]}),Object(h.jsx)("div",{className:"column right-column",children:Object(h.jsx)(A.a,{in:!!r,timeout:300,unmountOnExit:!0,mountOnEnter:!0,children:Object(h.jsx)("div",{onClick:c,className:"button delete-completed-button",children:"Delete completed"})})})]})})]})})}}]),n}(c.a.Component),$={changeSearchTasksInputValue:function(e){return J(e)},checkAllTasks:function(){return{type:M}},deleteCompletedTasks:function(){return{type:P}}},Y=Object(i.b)((function(e){var t=e.tasks;return{tasksList:t.list,searchTasksInputValue:t.searchTasksInputValue}}),$)(W),q=n(66),z="All",Q="all",X="Active",Z="active",ee="Completed",te="completed",ne=(n(56),function(e){var t=e.otherValue,n=e.hightlightValue;return Object(h.jsxs)(h.Fragment,{children:[t,Object(h.jsx)("span",{className:"hightlight",children:n})]})}),ae=function(e){var t=e.searchValue,n=e.string;if(t){var a=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(a,"gi"),r=n.match(c);return r?n.split(c).map((function(e,t,a){if(t<a.length-1){var c=r.shift();return Object(h.jsx)(ne,{hightlightValue:c,otherValue:e},t+n)}return e})):n}return n},ce=function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(b.a)(this,n),(a=t.call(this,e)).handleClickValue=function(){var e=a.props.value;a.setState({isShowEditValue:!0,editorValue:e})},a.handleChangeEditor=function(e){console.log(e.target.value),a.setState({editorValue:e.target.value})},a.addNewValue=function(){var e=a.props,t=e.editTask,n=e.id,c=a.state.editorValue;c.trim()?(t({id:n,value:c}),a.setState({isShowEditValue:!1})):a.setState({isShowEditValue:!1,editorValue:""})},a.handlePressEditor=function(e){"Enter"===e.key&&a.addNewValue()},a.handleBlurEditor=function(){a.addNewValue()},a.handleFocusEditor=function(e){var t=e.target.value;e.target.value="",e.target.value=t},a.state={isShowEditValue:!1,editorValue:""},a}return Object(O.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.value,a=t.check,c=t.id,r=t.toggleTask,s=t.deleteTask,i=t.searchInputValue,u=this.state,o=u.isShowEditValue,d=u.editorValue;return Object(h.jsxs)("li",{className:"tasks-item".concat(a?" checked":""),id:c,children:[Object(h.jsx)("div",{className:"check-button",onClick:function(){return r(c)},children:Object(h.jsx)(A.a,{in:a,timeout:300,unmountOnExit:!0,mountOnEnter:!0,children:Object(h.jsx)(l.a,{icon:j.c})})}),Object(h.jsx)("div",{className:"value",children:o?Object(h.jsx)("input",{onFocus:this.handleFocusEditor,autoFocus:!0,onChange:this.handleChangeEditor,onKeyPress:this.handlePressEditor,className:"inner editor",onBlur:this.handleBlurEditor,value:d,type:"text"}):Object(h.jsx)("div",{className:"inner",onClick:function(){return e.handleClickValue()},children:Object(h.jsx)(ae,{searchValue:i,string:n})})}),Object(h.jsx)("div",{className:"delete-button",onClick:function(){return s(c)},children:Object(h.jsx)(l.a,{icon:j.k})})]})}}]),n}(c.a.Component),re={deleteTask:function(e){return function(e){return{type:D,payload:{id:e}}}(e)},toggleTask:function(e){return function(e){return{type:B,payload:{id:e}}}(e)},editTask:function(e){return function(e){return{type:U,payload:e}}(e)}},se=Object(i.b)((function(e){return{searchInputValue:e.tasks.searchTasksInputValue}}),re)(ce),ie=(n(57),function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(b.a)(this,n),(a=t.call(this,e)).componentDidUpdate=function(e){var t=e.tasksList,n=e.filter,c=e.searchInputValue,r=a.props,s=r.tasksList,i=r.filter,u=r.searchInputValue;(t.length<s.length||n!==i||c!==u)&&a.tasksMainRef.current.scrollTo(0,0)},a.tasksMainRef=c.a.createRef(),a}return Object(O.a)(n,[{key:"render",value:function(){var e=this.props,t=e.tasksList,n=e.filter,a=e.searchInputValue;return Object(h.jsx)("main",{className:"tasks-main",ref:this.tasksMainRef,children:Object(h.jsx)("div",{className:"tasks-list",children:Object(h.jsx)("div",{className:"container",children:Object(h.jsx)("ul",{children:Object(h.jsx)(q.a,{component:null,children:t.filter((function(e){switch(n){case Z:return!e.check;case te:return e.check;default:return e}})).filter((function(e){if(a){var t=a.toLowerCase();return!!e.value.toLowerCase().includes(t)}return e})).reverse().map((function(e){var t=e.check,n=e.value,a=e.id;return Object(h.jsx)(A.a,{timeout:300,children:Object(h.jsx)(se,{check:t,value:n,id:a})},a)}))})})})})})}}]),n}(c.a.Component)),ue=Object(i.b)((function(e){var t=e.tasks;return{tasksList:t.list,filter:t.filter,searchInputValue:t.searchTasksInputValue}}))(ie),oe=(n(58),n(59),{changeTaskFilter:function(e){return H(e)}}),le=Object(i.b)((function(e){return{filter:e.tasks.filter}}),oe)((function(e){var t=e.name,n=e.title,a=e.changeTaskFilter,c=e.filter,r="".concat(t===c?t+" current":t," button tasks-filter-button");return Object(h.jsx)("button",{onClick:function(){return a(t)},className:r,children:n})})),je=function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(b.a)(this,n),(a=t.call(this,e)).handleChangeInput=function(e){var t=a.props.changeAddTaskInputValue,n=e.target.value;n.length<=140&&t(n)},a.handlePressInput=function(e){"Enter"===e.key&&a.handleClickButton()},a.handleClickButton=function(){var e=a.props,t=e.changeAddTaskInputValue,n=e.addTaskInputValue;n.length&&n.trim()?((0,a.props.addNewTask)(n),t(""),a.setState({redInputBorder:!1})):a.setState({redInputBorder:!0});a.inputRef.current.focus()},a.handleBlurInput=function(){a.setState({redInputBorder:!1})},a.state={redInputBorder:!1},a.inputRef=c.a.createRef(),a}return Object(O.a)(n,[{key:"render",value:function(){var e=this.props,t=e.addTaskInputValue,n=e.tasksList,a=this.state.redInputBorder;return Object(h.jsxs)("footer",{className:"tasks-footer",children:[Object(h.jsx)(A.a,{in:!!n.length,timeout:300,mountOnEnter:!0,unmountOnExit:!0,children:Object(h.jsx)("div",{className:"filters",children:Object(h.jsxs)("div",{className:"filters-container container",children:[Object(h.jsx)(le,{name:Q,title:z}),Object(h.jsx)(le,{name:Z,title:X}),Object(h.jsx)(le,{name:te,title:ee})]})})}),Object(h.jsx)("div",{className:"add-task-input",children:Object(h.jsx)("div",{className:"container input-container",children:Object(h.jsxs)("div",{className:"input-wrapper",children:[Object(h.jsx)("input",{ref:this.inputRef,className:a?"red":"",onKeyPress:this.handlePressInput,onBlur:this.handleBlurInput,onChange:this.handleChangeInput,value:t,type:"text",placeholder:"Add Task"}),Object(h.jsx)(A.a,{in:!!t,timeout:300,unmountOnExit:!0,mountOnEnter:!0,children:Object(h.jsx)("button",{onClick:this.handleClickButton,className:"button",children:Object(h.jsx)(l.a,{icon:j.j})})})]})})})]})}}]),n}(c.a.Component),he={addNewTask:function(e){return function(e){return{type:_,payload:{value:e}}}(e)},changeAddTaskInputValue:function(e){return G(e)}},de=Object(i.b)((function(e){var t=e.tasks;return{tasksList:t.list,searchTasksInputValue:t.searchTasksInputValue,addTaskInputValue:t.addTaskInputValue}}),he)(je),be=n(64),Oe=(n(60),n(61),function(){return Object(h.jsx)("div",{className:"tasks-welcome-banner",children:Object(h.jsxs)("div",{className:"container",children:[Object(h.jsx)("div",{className:"text",children:"This is where your tasks will be. You can add your first task in the field below."}),Object(h.jsx)(l.a,{icon:j.a})]})})}),pe=function(e){Object(p.a)(n,e);var t=Object(f.a)(n);function n(){return Object(b.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"componentDidUpdate",value:function(e){var t=this.props,n=t.tasksList,a=t.changeAddTaskInputValue,c=t.changeTaskFilter,r=t.changeSearchTasksInputValue,s=e.tasksList;!n.length&&s.length&&(a(""),c(Q),r(""))}},{key:"render",value:function(){var e=this.props.tasksList;return Object(h.jsxs)("div",{className:"screen tasks-screen",children:[Object(h.jsx)(be.a,{mode:"out-in",children:Object(h.jsx)(A.a,{timeout:300,children:e.length?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(Y,{}),Object(h.jsx)(ue,{})]}):Object(h.jsx)(Oe,{})},!e.length)}),Object(h.jsx)(de,{})]})}}]),n}(c.a.Component),fe={changeAddTaskInputValue:function(e){return G(e)},changeTaskFilter:function(e){return H(e)},changeSearchTasksInputValue:function(e){return J(e)}},me=Object(i.b)((function(e){return{tasksList:e.tasks.list}}),fe)(pe),ve=function(){var e=Object(o.e)();return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(q.a,{component:null,children:Object(h.jsx)(A.a,{timeout:300,children:Object(h.jsxs)(o.c,{location:e,children:[Object(h.jsx)(o.a,{path:"/",element:Object(h.jsx)(v,{})}),Object(h.jsx)(o.a,{path:"/news",element:Object(h.jsx)(x,{})}),Object(h.jsx)(o.a,{path:"/weather",element:Object(h.jsx)(L,{})}),Object(h.jsx)(o.a,{path:"/tasks",element:Object(h.jsx)(me,{})})]})},e.key)}),Object(h.jsx)(d,{})]})},ke=Object(i.b)((function(e){return{store:e}}))((function(e){var t=e.store;return Object(a.useEffect)((function(){localStorage.setItem("all-in-one",JSON.stringify(t))})),Object(h.jsx)(u.a,{children:Object(h.jsx)(ve,{})})})),xe=n(21),ge=n(32),ye=n(4),Te=JSON.parse(localStorage.getItem("all-in-one")),Ne=(Te=Te?Te.tasks:null)||{list:[],filter:Q,searchTasksInputValue:"",addTaskInputValue:""};var Ce=JSON.parse(localStorage.getItem("all-in-one")),we=(Ce=Ce?Ce.weather:null)||{currentLocation:{city:""}};var Ee=Object(xe.combineReducers)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ne,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload,c=e.list;switch(n){case _:return Object(ye.a)(Object(ye.a)({},e),{},{list:c.concat({value:a.value,check:!1,id:Date.now()})});case B:return Object(ye.a)(Object(ye.a)({},e),{},{list:c.map((function(e){return e.id===a.id?Object(ye.a)(Object(ye.a)({},e),{},{check:!e.check}):e}))});case D:return Object(ye.a)(Object(ye.a)({},e),{},{list:c.filter((function(e){return e.id!==a.id}))});case F:return Object(ye.a)(Object(ye.a)({},e),{},{filter:a.filter});case K:return Object(ye.a)(Object(ye.a)({},e),{},{searchTasksInputValue:a.value});case R:return Object(ye.a)(Object(ye.a)({},e),{},{addTaskInputValue:a.value});case M:var r=!1;return c.forEach((function(e){e.check||(r=!0)})),Object(ye.a)(Object(ye.a)({},e),{},{list:c.map((function(e){return Object(ye.a)(Object(ye.a)({},e),{},{check:r})}))});case P:return Object(ye.a)(Object(ye.a)({},e),{},{list:c.filter((function(e){return!e.check}))});case U:return Object(ye.a)(Object(ye.a)({},e),{},{list:c.map((function(e){var t=a.id,n=a.value;return e.id===t&&(e.value=n),e}))});default:return e}},weather:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:we,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload,c=e.currentLocation;return n===g?Object(ye.a)(Object(ye.a)({},e),{},{currentLocation:Object.assign(c,a)}):e}}),Ve=n(33),Ie=n.n(Ve),Se=n(34),Le=Object(xe.createStore)(Ee,Object(ge.composeWithDevTools)(Object(xe.applyMiddleware)(Ie.a,Se.a))),Ae=function(){return Object(h.jsx)(i.a,{store:Le,children:Object(h.jsx)(ke,{})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(62);s.a.render(Object(h.jsx)(Ae,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[63,1,2]]]);
//# sourceMappingURL=main.551b1fb4.chunk.js.map