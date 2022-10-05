<script>
  import Dropzone from '../components/dropzone.svelte';
  import Metadata from '../components/Metadata.svelte';
  import {modelSelected, confidence} from '../store';
  import {postFormData} from '../lib/apiCall';

  let preview;
  let file;
  let showResp = false;
  let showPreview = false;
  let response;


  function previewVideo(e){
    file = e.detail;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      let videoPrev = e.target.result
      preview = videoPrev
    };
    response = null;
    showPreview = true;
    showResp = false;
  }

  async function uploadVideo(){
      const body = {
        file: file, 
        model: $modelSelected, 
        confidence: $confidence
      };
      let resp = await postFormData('video', body, true); 
      file = resp;
      response = file;
      preview = null;
      showResp = true;
      showPreview = false;
    }

</script>
  <div class="grid grid-cols-1 md: grid-flow-row-dense md:grid-cols-3 place-items-center">
      <div class="grid grid-cols-1 gap-3 place-items-center">
          <div class="p-5">
              <Dropzone type='video' on:file={previewVideo} />
            </div>
              <!-- svelte-ignore a11y-media-has-caption -->
              {#if showPreview}
              <video src={preview} width="320" height="240" controls></video>
              {/if}
              <Metadata/>
              <button class="bg-blue-500 hover:bg-blue-800 rounded-lg drop-shadow-xl text-white text-center px-3 py-2" on:click={uploadVideo}>Detectar</button>
            </div>
            <div class="col-span-2 m-5">
              <!-- svelte-ignore a11y-media-has-caption -->
              {#if showResp}
              <video src={response} controls></video>
              {/if}
        </div>
  </div>