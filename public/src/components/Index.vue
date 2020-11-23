<template>
    <div class="index">
        <input type="file" class="upload_file">
    </div>
</template>

<script>
    export default{
        data() {
            return {
                
            }
        },
        created() {
            console.log(window.location)
            var origin  = window.location.origin;
           $.ajax({
               type:'post',
               url:origin+"/upload",
               success:function(res){
                   console.log(res)
               }
           })
        },
    }
</script>


<style scoped>
    .upload_file{
       background:none; outline:none; border:none; 
    }
</style>
