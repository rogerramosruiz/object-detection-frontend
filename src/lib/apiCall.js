const api = import.meta.env.VITE_API;

export async function get(url){
    return await (await fetch(`${api}/${url}`)).json();
}

export async function postFormData(url ,body, media=false){
    const formData = new FormData();
    for(var i in body){
        formData.append(i, body[i])
    }
    const options = {
      method: 'POST',
      body: formData  
    }
    let resp =  await fetch(`${api}/${url}`, options);
    resp = await resp.json()
    if(media)
        return urlMedia(resp);
    return resp;
}

export function urlMedia(resp){
    return `${api}/${resp['filename']}`
}