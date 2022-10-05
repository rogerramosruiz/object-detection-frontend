<script>
  
  import Dropzone from '../components/dropzone.svelte';
  import Metadata from '../components/Metadata.svelte';
  import {modelSelected, confidence} from '../store';
  import {postFormData} from '../lib/apiCall';

  let preview;
  let file;
  let showResp = false;
  let showPreview = false;

  function previewImage(e){
    file = e.detail;
    let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
              preview = e.target.result;
        }
        showPreview = true;
        showResp = false;
  }

  async function uploadImage(){
    const body = {
      file:file, 
      model: $modelSelected, 
      confidence: $confidence
    };
    let resp = await postFormData('image', body, true); 
    file = resp;
    preview =null;
    showResp = true;
    showPreview = false;
  }

</script>
<div class="grid grid-cols-1 md: grid-flow-row-dense md:grid-cols-3 place-items-center">
  <div class="grid grid-cols-1 gap-1 place-items-center">
    <div class="p-5">
      <Dropzone type='image' on:file={previewImage} />
    </div>
    {#if showPreview}
      <img class="m-2" src={preview} alt="" width="300px" >  
    {/if}
    <Metadata/>
    <button class="bg-blue-500 hover:bg-blue-800 rounded-lg drop-shadow-xl text-white text-center px-3 py-2" on:click={uploadImage}>Detectar</button>
  </div>
  <div class="col-span-2 m-5">
    {#if showResp}
      <img src={file} alt="" height="600px">
    {/if}
  </div>
</div>