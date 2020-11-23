<template>
  <div class="index">
    <h2 class="title">图片、视频上传小工具 （支持批量上传）</h2>
    <div class="search">
      <input
        type="text"
        class="upload_file"
        v-model="value"
      >
      <div style="width:10%">
        <input
          type="file"
          style="display:none"
          id="file"
          multiple="multiple"
          @change="chooseFile($event)"
        >
        <a
          href="javascript:;"
          class="choose"
          @click="btnFile"
        >选择图片</a>
      </div>
      <div style="width:10%">
        <!-- <input type="file" style="display:none" @click="uploadFile"> -->
        <a
          href="javascript:;"
          class="btnUpload"
          @click="btnUpload"
        >上传</a>
      </div>
    </div>
    <div class="content">
      <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>地址</th>
            <th>预览 </th>
            <th>日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in dataList"
            :key="index"
          >
            <td>{{item.id}}</td>
            <td>{{item.url}}</td>
            <td><img :src="item.url" alt=""></td>
            <td>{{item.time}}</td>
            <td>{{item.time}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      dataList: ""
    };
  },
  created() {
    let origin = window.location.origin;
    let self = this;
    $.ajax({
      url: origin + "/getFile",
      type: "get",
      data: "",
      dataType: "json",
      processData: false, // 告诉jQuery不要去处理发送的数据
      contentType: false, // 告诉jQuery不要去设置Content-Type请求头
      success: function(res) {
        self.dataList = res;
        console.log(res);
      },
      fail: function(err) {
        console.log(err);
      }
    });
  },
  methods: {
    btnFile: function() {
      $("#file").click();
    },
    chooseFile: function(e) {
      let len = e.target.files.length;
      let origin = window.location.origin;
      let fileName = "";
      let file = "";
      let formData = new FormData();

      for (let i = 0; i < len; i++) {
        file = e.target.files[i];
        fileName = e.target.files[i].name;
        formData.append("file" + i, file);
        formData.append("fileName" + i, fileName);
        this.value += e.target.files[i].name + "  ";
      }

      $.ajax({
        url: origin + "/upload",
        type: "post",
        data: formData,
        dataType: "json",
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        success: function(res) {
          console.log(res);
        },
        fail: function(err) {
          console.log(err);
        }
      });
      console.log(e.target.files.length);
    },
    btnUpload: function() {}
  }
};
</script>


<style scoped >
a {
  text-decoration: none;
}
.title {
  color: #8e8188;
  padding-top: 25px;
  display: block;
}
.search {
  display: flex;
  width: 100%;
}
.upload_file {
  background: #eee;
  display: block;
  width: 80%;
  height: 40px;
  border: 0px;
  outline: none;
}
.choose {
  display: block;
  height: 40px;
  /* width: 10%; */
  background: #5a6a7a;
  color: #fff;
  line-height: 40px;
  text-align: center;
}
.btnUpload {
  display: block;
  height: 40px;
  /* width: 10%; */
  background: #4cb6cb;
  color: #fff;
  line-height: 40px;
  text-align: center;
}

table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  margin-top: 20px;
}
table td,
table th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
}
table thead th {
  background-color: #cce8eb;
  width: 100px;
}
table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #f5fafa;
}
table tr td{
    font-size: 12px;
}
</style>
