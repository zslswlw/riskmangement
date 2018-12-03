<template>
    <div class="logRish">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="form"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">

                    <el-form-item label="井站:" >
                        <el-select v-model="form.place" placeholder="井站">
                            <el-option
                             v-for="(formtype, index) in format_place_list"
                             :key="index" 
                             :label="formtype" :value="formtype"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop='describe' label="问题描述:">
                        <el-input type="describe" v-model="form.describe"></el-input>
                    </el-form-item>

                    <el-form-item prop='grade'  label="缓急程度:">
                        <el-select v-model="form.grade" placeholder="缓急程度">
                          <el-option
                             v-for="(formtype, index) in format_grade_list"
                             :key="index" 
                             :label="formtype" :value="formtype"
                            ></el-option>
                          </el-select>
                    </el-form-item>

                    <el-form-item prop='reason' label="问题原因分析:">
                        <el-input type="reason" v-model="form.reason"></el-input>
                    </el-form-item>

                    <el-form-item prop='handler' label="整改责任人:">
                        <el-input type="handler" v-model="form.handler"></el-input>
                    </el-form-item>

                    <el-form-item prop='deadline' label="整改时限:">
                        <el-input type="deadline" v-model="form.deadline"></el-input>
                    </el-form-item>

                    <el-form-item prop='condition' label="整改情况:">
                        <el-input type="condition" v-model="form.condition"></el-input>
                    </el-form-item>

                    <el-form-item prop='monitor' label="监控措施:">
                        <el-input type="monitor" v-model="form.monitor"></el-input>
                    </el-form-item>

                    <el-form-item prop='rectify' label="彻底整改措施:">
                        <el-input type="rectify" v-model="form.rectify"></el-input>
                    </el-form-item>

                    <el-form-item  prop='image1' v-model="form.image1" label="整改前图片:">
                          <el-upload
                            action="/"
                            ref="upload1"
                            :file-list="imageList1"
                            :class="{disabled:uploadDisabled1}"
                            :on-remove="handleRemove1"
                            :on-preview="handlePictureCardPreview"
                            :http-request="uploadImage1"
                            :limit="1"
                            list-type="picture-card">
                            <i class="el-icon-plus"></i>
                          </el-upload>                      
                          <!-- <el-input  v-model="form.image1"/> -->
                    </el-form-item>

                    <el-form-item prop='image2' v-model="form.image2" label="整改后图片:">
                        <el-upload
                            action="/"
                            ref="upload2"
                            :file-list="imageList2"                           
                            :class="{disabled:uploadDisabled2}"
                            :on-remove="handleRemove2"
                            :on-preview="handlePictureCardPreview"
                            :http-request="uploadImage2"
                            :limit="1"
                            list-type="picture-card">
                            <i class="el-icon-plus"></i>
                          </el-upload> 
                          <!-- <el-input  v-model="form.image2" />  -->
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>  
                    </el-form-item>

                     <el-form-item label="备注:">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>

                    <el-form-item  class="text_right">
                        <el-button @click="calDialog">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "logrisk",
  props: {
    dialog: Object,
    form: Object,
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      imageIslive1: false,
      imageIslive2: false,
      //imageList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      format_place_list: [
        "增压西站",
        "增压东站",
        "南雅中心站",
        "巫山坎中心站"
      ],
      format_grade_list: [
        "一般",
        "紧急",
      ],
      form_rules: {
        describe: [
          { required: true, message: "描述不能为空！", trigger: "blur" }
        ],
        grade: [
          { required: true, message: "缓急程度不能为空！", trigger: "blur" }
        ],
        reason: [
          { required: true, message: "原因分析不能为空！", trigger: "blur" }
        ],
        handler: [{ required: true, message: "整改责任人不能为空！", trigger: "blur" }]
      },
      
    };
  },
  computed:{
    imageList1: function(){
       if(this.isEmpty(this.form.image1)){
         console.log("no");
         return []
       }else{
         console.log("have");
         return [{url:this.form.image1}]
       }
     },
     imageList2: function(){
       if(this.isEmpty(this.form.image2)){
         return []
       }else{
         return [{url:this.form.image2}]
       }
     },

    uploadDisabled1: function(){
      return this.imageList1.length > 0
    },
    uploadDisabled2: function(){
      return this.imageList2.length > 0
    },
  },
  methods: {  
    handleRemove1(file, fileList){
      this.form.image1 = ""
      this.imageList1 = fileList;
    },
    handleRemove2(file, fileList){
      this.form.image2 = ""
      this.imageList2 = fileList;
    },
    
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    calDialog(){
      this.dialog.show = false;
      this.imageIslive = false
    },
    onSubmit(form) {
      console.log(this.form.image1); 
      console.log(this.form.image2);   
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          const url =
            this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$axios.post(`/api/profiles/${url}`, this.form).then(res => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.dialog.show = true;
            this.$emit("update");
          });
        }
      });
    },

    uploadImage1(params){
      //console.log(params);
      let reader = new FileReader();
      const _this = this;
      reader.onload = function(){
        _this.form.image1=this.result;
        _this.imageIslive1 = true
      };
      reader.readAsDataURL(params.file);      
    },

    uploadImage2(params){
      //console.log(params);
      let reader = new FileReader();
      const _this = this;
      reader.onload = function(){
        _this.form.image2=this.result;
        _this.imageIslive2 = true
      };
      reader.readAsDataURL(params.file);
    },
    
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  }
};
</script>

<style>
.disabled .el-upload--picture-card{
  display:none;
}
</style>
