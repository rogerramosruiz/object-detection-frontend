<script> 
import {confidence, modelSelected} from '../store.js';
import {get} from '../lib/apiCall';

let models = [];

async function getModels(){
  let resp = await get('models')
  models = resp['models'];
  $modelSelected = models[0];
} 

getModels()

</script>

<div class="grid grid-col-1 place-items-center">
  <div>
    <label class="mb-2 text-md font-medium text-gray-900 dark:text-gray-400" for='selectmodel' >Modelo</label>
    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" bind:value={$modelSelected} id='selectmodel'>
      {#each models as model}
        <option value={model}>
          {model}
        </option>
      {/each}
    </select>
  </div>
  <div class="flex items-center space-x-2">
    <label class="mb-2 text-md font-medium text-gray-900 dark:text-gray-400" for='range'>Confiabilidad</label>
    <input type="range" min="30" max="100" bind:value={$confidence} class="" id="range">
    <p1 class="mb-2 text-md font-medium text-gray-900 dark:text-gray-400">{$confidence}%</p1>  
  </div>
</div>

