<template>
    <div class="index">
          <input
            type="file"
            class="upload_file"
            @change="uploadFile($event)"
        >
    </div>
</template>

<script>
    export default{
        data() {
            return {
                
            }
        },
        created() {
        },
        methods: {
            uploadFile: function(e) {
              let origin = window.location.origin;
              let fileName = e.target.files[0].name;
              let file = e.target.files[0];
              let formData = new FormData();
              formData.append("file", file);
              formData.append("fileName", fileName);
              console.log(formData)
              $.ajax({
                url: origin+"/upload",
                type: "post",
                data: formData,
                dataType: "json",
                processData: false, // 告诉jQuery不要去处理发送的数据
                contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                success: function(res) {
                  console.log(res);
                },
                fail:function(err){
                    console.log(err)
                }
              });
            }
  }
    }
</script>


<style scoped>
    .upload_file{
       background:none; outline:none; border:none; 
    }
</style>
