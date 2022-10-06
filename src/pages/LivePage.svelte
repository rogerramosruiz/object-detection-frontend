<script>
    // @ts-nocheck
    import Metadata from '../components/Metadata.svelte';
    import {modelSelected, confidence} from '../store';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import BsCameraVideoOff from 'svelte-icons-pack/bs/BsCameraVideoOff';
    import BsPersonBoundingBox from 'svelte-icons-pack/bs/BsPersonBoundingBox';
    
    import {get} from "../lib/apiCall";

    let videoSource = "https://dr.sf-converter.com/download?id=9fa67ff14e16538bbf639362aef3131002b2f3dc187c90317635a8754ac84480&payload=1*eJzVVmuLo0gU%2FSuhoYtdaNO%2BysdAMdh5mthR8zKdL42P0lR8Rk1Metj%2FvqWZnZ2F%2BTILCzsQThWl917PPbcO%2BfJQ5efSx5syefj0cKjrovr0%2FNw0Tf%2BWn%2Buzh%2Ft%2Bnj43bu0fPl9QHG%2F0YK5iV48fnr5G6sFPB7rngOT%2FrFiWkGGYKmMylr9G%2BfUcXiKB4SOv6kd5HiX4QgKcdzm7XZG4N8%2F148%2F4WpASI06CqioqMi8DTNBWKJu3Uti8BOYg0kJFFb18YANSIJ7j%2BxzL96Hc5zkFkADljGZq47e3c2gKm%2BNiZKx1do51s9iro3Qt2sUgti4zUzVvJmtIgNRuhDiRBXf26CtbUOLTmX5IVSXohiuQHlChgTRFAvfID3gVpBn6ETv6kB6LEUw%2BMhyDtELumZ6VwRmkF5RSIAiCIkE8BCQjtd9kgVdUSIE8ZOlHFD5K1sz8kOl1ZIy0QHeHI8Z7%2BdhETbzSYa3H4FKUF8SBlKQYdZ1%2F5MdpIYKsQicr3wQ3l5kMr0Z2Dq1ysYRqXk1BRMqOhp%2FgDPG0fxKtH5xLxMlKX%2BEkkKQ14qAsqirtqMgqLK9A0J61OvCSSnUIL7TfHIgxLtyEXHCXMKR6IRrAcoIstJ2hW5kXJeAjZ%2FQCSu9UpSgsQU1fg1DgRIEHGQo%2F3vbsTt1uJ9dyq1HWbunSVt21p1kwoUCKFoIWqEZtYzuF2m5%2B06Y9LXyKbVPo0jaFLlmrA%2BVMsWVMF8qVImUJkr%2BqpYc2IG2hfSNtY9IuyaUtX7TJv5OIBpIIaRNh8H7VmqWtHzSrWsGXg0C81%2BVuxg7h6FRovq3WYys9hckLTPyctyee4Eh7jbzMoEEcYeGc8Gz3XvvebWoXIu8Xl%2BO6me62ZK1EgaRRlrX2KAzpD3QFzRNrz5S2YLRshgbER8uND3jo7avF27YoJzvCLrbu3AjWeiLcbp4jBKvXgW4PneQq7slhJLqed9rNpeXe%2BZjtPsZFEy2dOl805aa4Ts18sLHvBelV7i7jL32VBQm47a6i23YiOUHsEHYodSi3KLHdvPId3mdX7FDuUGlRblFQxQ5hh1KHcof3p%2Bqv6R2dWD%2FrHdQcoCpy%2FDfzkCXue%2FOQZEUVZF4V%2FwPzgP%2FKPO7D8H%2Bzj4jaxyw7ye7YEJhiqk7t7WWpvu%2FcZTCTbzmraZwZpaflmHdiY7PWyEg7T6xTYw5GrlW%2FyuZ4vTeVY45fxbmVGo4Tr6R4tF8y1h6%2Bj35kHs5x1RwLjOvNdBfazOSWRVaajIY64ZMNtk%2B7TRZAI3CYa07NY1AbCxbGfLPeWSs794ZBRP8L%2BFs8m2%2B542DA5reDlQ23cC1p38yjJnWCqXMYq2GP6S3y3gI3vXFJcBZUvd%2FMMCQ%2BcZPeth2833th3e8ZrleSrD489VbEfeoNSZHkNNFdy0qrHz797R5%2F%2FAlbDtNa*1659927127*3c56cac06c0b9313";
    let imgRecived = 'https://media.istockphoto.com/id/637696304/es/foto/pat%C3%A1n.webp?s=612x612&w=is&k=20&c=oqzChLS6ht3uaYyla1dY9RBbQPr9gYZkTu3TDHqNmXw=';
    let ws;
    let interval;
    
    let isStreaming = false;
    
    const data = {}
    
    function streamVideo(video, context, canvas){
        context.drawImage(video, 0,0, context.width, context.height);
        var imgbase64 = canvas.toDataURL('image/webp');
        data['image'] = imgbase64;
        data['confidence'] = $confidence;
        data['keepconection'] = isStreaming;
        data['model'] = $modelSelected;

        ws.send(JSON.stringify(data))
    }
    
    
    function createCanvas(width, height){
        const canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;            
        context.width  = canvas.width;
        context.height  = canvas.height;
        return {canvas, context};
    }

    const getCameraVideo = async ()=>{
        try{
            var video = document.querySelector("video"); 
            video.setAttribute("playsinline", true);
            video.setAttribute("autoplay", true);
            const stream = await navigator.mediaDevices.getUserMedia({video: true})
            videoSource.srcObject = stream;
            videoSource.play();            
            return video;
        }
        catch (error){
            console.log('error', error)
            // alert("Camera error", error)
        }
    }
    async function stream() {
        var interv = 1000;
        var gpu = await get('gpu');
        if(gpu['gpu'])
            interv = 250;
        ws = new WebSocket("ws://localhost:8000/ws");
        const video = await getCameraVideo();  
        let {width, height} = videoSource.srcObject.getTracks()[0].getSettings();
        const {canvas, context} = createCanvas(width, height);
        isStreaming = true;
        ws.onmessage = function(event) {
            imgRecived = event.data;
        };
        interv = setInterval(() => {
            streamVideo(video, context, canvas);
        }, interv);
    }
    function endConection(){
        isStreaming = false;
        imgRecived = null;
        clearInterval(interval)
        location.reload(); 
        
    }
</script>

<div hidden>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video playsinline="true" autoplay="true" bind:this={videoSource} class="none"></video>
</div>
<div class="grid grid-cols-1 gap-5 place-items-center">
    {#if isStreaming}
    <img src={'data:image/jpg;base64,'+imgRecived} alt="">
    {/if}
    <div class="grid grid-cols-1 space-y-3 md:grid-cols-2  place-items-center">
        <div >
            {#if !isStreaming}
            <button class="flex space-x-2 items-center px-3 py-2 bg-blue-500 hover:bg-blue-800 rounded-2xl drop-shadow-2xl text-white" on:click={stream}>
                <div class="m-1">
                    <Icon src={BsPersonBoundingBox} color="white" size="25" title="Detener transmision"/>
                </div>    
                    <span>
                        Detecion en vivo
                    </span>
                </button>
                {:else}
                <button class="flex space-x-2 items-center px-3 py-2 bg-rose-500 hover:bg-rose-800 rounded-2xl drop-shadow-2xl text-white" on:click={endConection} >
                    <div class="m-1">
                        <Icon src={BsCameraVideoOff} color="white" size="25" title="Detener transmision" />
                    </div>    
                    <span>
                       Detener detecion en vivo
                    </span>
                </button>
            {/if}
        </div>
        <Metadata/>
    </div>
</div>