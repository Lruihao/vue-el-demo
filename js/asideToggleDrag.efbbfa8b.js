"use strict";(self["webpackChunkvue_el_demo"]=self["webpackChunkvue_el_demo"]||[]).push([[264],{86285:function(i,e,t){t.d(e,{Z:function(){return r}});var a=function(){var i=this,e=i._self._c;return e("div",{staticClass:"aside-toggler-container",attrs:{"data-position":i.position},on:{mousedown:i.dragEvent}},[!i.isCollapse&&i.dragElement?e("div",{staticClass:"resize-bar"}):i._e(),i.tooltipVisible?e("el-tooltip",{attrs:{effect:"dark",content:i.tooltipContent,placement:"right"===i.position?"left":"right"}},[e("div",{staticClass:"aside-toggler",on:{click:i.toggle}},[e("i",{class:i.iconClass})])]):i._e()],1)},s=[],o={name:"AsideToggler",props:{isCollapse:{type:Boolean,default:!1},tooltip:{type:String,default:""},activeTooltip:{type:String,default:""},inactiveTooltip:{type:String,default:""},position:{type:String,default:"left"},minWidth:{type:Number,default:200},maxWidth:{type:Number,default:600},dragElementClass:{type:String,default:""}},data(){return{tooltipVisible:!0,dragElement:void 0}},computed:{tooltipContent(){const i=this.activeTooltip||`收起${this.tooltip}`,e=this.inactiveTooltip||`展开${this.tooltip}`;return this.isCollapse?e:i},iconClass(){return{"aside-toggler-icon":!0,"el-icon-caret-left":!this.isCollapse,"el-icon-caret-right":this.isCollapse}}},watch:{position(i){this.tooltipVisible=!1,this.$nextTick((()=>{this.tooltipVisible=!0}))}},mounted(){this.$nextTick((()=>{this.dragElementClass&&(this.dragElement=this.$parent.$el.getElementsByClassName(this.dragElementClass)[0])}))},methods:{toggle(i){i.stopPropagation(),this.$emit("update:isCollapse",!this.isCollapse),this.$emit("toggle",!this.isCollapse)},dragEvent(i){if(i.stopPropagation(),this.isCollapse||!this.dragElement)return;const e=i.clientX,t=this.dragElement.offsetWidth;document.onmousemove=i=>{const a="left"===this.position?t+(i.clientX-e):t-(i.clientX-e);this.dragElement.style.width=`clamp(${this.minWidth}px, ${a}px, ${this.maxWidth}px)`;let s="col-resize";a<=this.minWidth?s="left"===this.position?"e-resize":"w-resize":a>=this.maxWidth&&(s="left"===this.position?"w-resize":"e-resize"),document.body.style.cursor=s},document.onmouseup=i=>{document.onmousemove=null,document.onmouseup=null,document.body.style.cursor=""}}}},u=o,n=t(1001),l=(0,n.Z)(u,a,s,!1,null,"4ba6c4c1",null),r=l.exports},16381:function(i,e,t){t.r(e),t.d(e,{default:function(){return m}});var a=function(){var i=this,e=i._self._c;return e("el-container",{staticClass:"content-container"},[e("el-aside",{directives:[{name:"show",rawName:"v-show",value:!i.isCollapse,expression:"!isCollapse"}],staticClass:"drag-element-left",attrs:{width:"200px"}},[i._v(" 左侧栏内容 ")]),e("aside-toggler",{attrs:{"is-collapse":i.isCollapse,"drag-element-class":"drag-element-left"},on:{"update:isCollapse":function(e){i.isCollapse=e},"update:is-collapse":function(e){i.isCollapse=e}}}),e("el-main",{staticClass:"content-main"},[i._v(" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora perspiciatis sunt nam mollitia suscipit totam! Libero cupiditate eum suscipit adipisci eos, rerum sit iure ducimus facilis corrupti ut sint a. Dignissimos fuga voluptatibus, vel, dolores doloremque quis aliquid quasi, unde rem asperiores veniam officia cumque libero ducimus perferendis? Cum consequuntur quibusdam officiis quo nam aliquam, aut architecto. Recusandae, tenetur aperiam. Praesentium recusandae aliquid dolores, dignissimos sequi veritatis totam aliquam error similique laborum nemo explicabo commodi ex, eos dolore tempora. Aperiam aliquid necessitatibus, veritatis totam ipsum quia id perspiciatis voluptatibus? Aliquid? Autem, sed dicta illo atque quas voluptatem dolor itaque illum quaerat nihil iusto laborum, eius ad aliquam. At consequuntur nesciunt dolores expedita libero veniam quos animi repellendus, in, ad ratione? Qui, dolores praesentium. Dolorum, vero ipsam exercitationem excepturi placeat nihil nobis. Quas, nostrum nemo. Harum earum accusantium blanditiis eligendi veritatis architecto reprehenderit quo sapiente odio, eaque laborum, ullam possimus error? Labore dolorum tenetur exercitationem! Cupiditate assumenda consequatur tempora accusamus. Perspiciatis expedita ipsum deleniti laudantium alias in, voluptates reiciendis sunt porro labore odit error adipisci quo, ea sed repellendus accusantium illum. Dignissimos, error inventore. Officia necessitatibus fugit neque magni reiciendis placeat vel voluptate assumenda, ducimus, modi rerum dicta id tempore quae error, eaque et sit illum culpa quasi ratione eveniet doloribus? Dicta ut porro, totam perferendis cupiditate illum dignissimos quam necessitatibus culpa, iste molestiae aliquid, quis quidem inventore aspernatur. Veniam similique, placeat quo deleniti aut cum modi provident magnam libero nostrum. Excepturi, labore! Nisi aliquam eaque, officiis eveniet et quia rem cum libero ut culpa aut voluptas perferendis sed dignissimos laudantium repudiandae a optio repellat? Placeat assumenda numquam reiciendis nobis magni? Dicta maiores deserunt numquam, laudantium a distinctio nisi quidem, culpa totam amet rem aspernatur magnam doloribus obcaecati aut reprehenderit temporibus ab sint possimus aliquid? Dolorum numquam minima voluptatibus? Ex, facere. Eius totam quia expedita atque quae suscipit quam. Optio ad alias soluta neque vitae! Possimus, itaque ullam quia vel, ipsum distinctio aliquid expedita fugiat voluptatum totam non consectetur laudantium quidem! Officia voluptatem atque aliquid! Ratione unde, tempora ipsam porro doloribus quasi provident, harum voluptatem, reprehenderit quos sunt voluptates quia! Earum, praesentium! In nesciunt optio iusto fugit ab quasi sunt libero. Vitae, amet. Voluptatem reprehenderit sint, officiis dicta suscipit voluptates corporis expedita pariatur, unde laudantium in blanditiis deserunt magnam at! Voluptate iste vitae exercitationem tempore perferendis eaque commodi aut laudantium hic? Aliquam dolore voluptatum impedit officiis itaque ab alias accusantium, corporis qui repudiandae sit cum nihil unde ratione beatae. Debitis repellendus facilis soluta quos sit esse, suscipit vitae beatae tempora tempore! Optio at id sint facere minus officia eveniet eius quod sapiente doloribus perspiciatis sunt, quos, exercitationem delectus, nisi dolor nesciunt? Facilis odit officia tempora neque repudiandae unde accusantium explicabo vero! Velit doloribus debitis odio inventore cum beatae quod eligendi laboriosam ut! Soluta ratione aperiam tempora optio ea placeat, recusandae officia veniam eligendi, amet iusto nihil, provident blanditiis dignissimos facere aspernatur. Ullam quae beatae inventore, dolore minima numquam aut eum consequatur perferendis odio delectus aliquam corporis ipsam omnis cupiditate, amet, nam quaerat commodi totam doloremque obcaecati quibusdam iure? Minima, labore quos! Ex obcaecati quidem, molestias, delectus possimus ipsa nulla consectetur autem sequi iste vitae dolorum, veniam quam. Quia provident ducimus exercitationem libero inventore, iusto ratione voluptate dolorem beatae. Aperiam, sed recusandae! A labore natus rem fuga, omnis neque perferendis maiores iusto nemo similique, assumenda expedita accusamus reiciendis corrupti numquam excepturi, deserunt nihil. Magnam, mollitia recusandae a iure cumque dolorem ipsa consequuntur? Dolorem voluptates ad consectetur repudiandae sit vero accusantium debitis veniam odio corporis, iste odit, quidem cumque? Omnis est illo ea, quasi, voluptates illum, beatae officiis iure blanditiis optio enim obcaecati! Sit eveniet molestiae in vitae enim tempore culpa vel aliquid laborum eaque expedita commodi reprehenderit architecto veniam perferendis aspernatur repudiandae obcaecati, doloribus odit. Nobis cupiditate consectetur rem ut quos repellendus! Numquam quis, sit amet autem in et tenetur sunt. Itaque autem repellendus iure nostrum labore qui laboriosam sed esse quibusdam, dignissimos, sit hic eum ea! A tempora molestias illo nam? Nostrum beatae doloribus magni vero ducimus dolorem optio necessitatibus ullam, facere quae qui quaerat nobis non ad cupiditate dignissimos quo et. Itaque animi asperiores minus delectus corporis? Laboriosam, ducimus provident? Facilis maxime, corporis doloribus molestiae corrupti nisi sed nemo. Incidunt suscipit id ea minima blanditiis asperiores accusantium tenetur delectus, repellendus, veritatis vero non, explicabo repudiandae quaerat laboriosam harum fugiat expedita. Natus nobis reprehenderit alias amet vel blanditiis ea? Eaque accusamus est saepe nihil illum. Illo veniam temporibus, repudiandae mollitia totam sint nihil nam quo, explicabo maiores vel, aliquid minima nulla. Omnis velit facere, repudiandae magnam suscipit tenetur distinctio esse laborum quidem, natus quia libero necessitatibus totam quos nesciunt iste doloribus ullam! Consequuntur accusamus aliquid nisi eveniet incidunt, rem nesciunt adipisci. Voluptatibus veritatis iste provident repellendus dolorem nihil unde quasi quam, eveniet veniam, laudantium in laboriosam officiis iusto, nemo id sapiente eius voluptatum? Nobis, vel quasi possimus eos et temporibus a. Nobis nostrum, est aspernatur veritatis ducimus distinctio, a temporibus eum dolore commodi vero excepturi. Veritatis illum necessitatibus optio nulla quam assumenda voluptatum culpa nam id? Aut accusantium ipsum nulla excepturi. Reiciendis, sed? Id eos vero neque asperiores nihil dolorem repudiandae quia nostrum laboriosam ratione quos sit voluptatum ex blanditiis, quasi accusamus officia. Inventore velit repellat necessitatibus laudantium qui omnis perspiciatis? Fugiat aliquam cupiditate eveniet quibusdam. Molestias omnis iure ratione assumenda alias expedita, numquam, culpa temporibus quis vitae voluptatum quibusdam amet facere. Dignissimos ipsum molestiae, omnis culpa excepturi explicabo laborum porro. ")]),e("aside-toggler",{attrs:{"is-collapse":i.isCollapseRight,position:"right","drag-element-class":"drag-element-right"},on:{"update:isCollapse":function(e){i.isCollapseRight=e},"update:is-collapse":function(e){i.isCollapseRight=e}}}),e("el-aside",{directives:[{name:"show",rawName:"v-show",value:!i.isCollapseRight,expression:"!isCollapseRight"}],staticClass:"drag-element-right",attrs:{width:"200px"}},[i._v(" 右侧栏内容 ")])],1)},s=[],o=t(86285),u={name:"AsideToggleDrag",components:{AsideToggler:o.Z},data(){return{isCollapse:!1,isCollapseRight:!1}}},n=u,l=t(1001),r=(0,l.Z)(n,a,s,!1,null,"64b23c88",null),m=r.exports}}]);
//# sourceMappingURL=asideToggleDrag.efbbfa8b.js.map