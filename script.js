const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    exposure: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayScale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}

const imageCanvas = document.querySelector("#image-canvas")
const imageInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")

const filtersContainer = document.querySelector(".filters")

function createFilterElement(name, unit = "%", value, min , max){
     const div = document.createElement("div")
     div.classList.add('filter')
     
     const input = document.createElement("input")
     input.type = "range"
     input.min = min
     input.max = max
     input.value = value
     input.id = name

     const p = document.createElement("p")
     p.innerText = name.charAt(0).toUpperCase() + name.slice(1)

     div.append(p)
     div.append(input)

    return div
}

Object.keys(filters).forEach( (key) =>{
    

    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
    filtersContainer.appendChild(filterElement)
      
})

imageInput.addEventListener("change", (e) => {
    const file  = e.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder")
    imagePlaceholder.style.display = "none"
    
    const img = new Image()
    img.src = URL.createObjectURL(file)
    
    img.onload = () =>{
        imageCanvas.height = img.height
        imageCanvas.width = img.width
        canvasCtx.drawImage(img, 0, 0)
    }
    
    

    
})



