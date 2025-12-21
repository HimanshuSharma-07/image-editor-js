let filters = {
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
const resetFilters = document.querySelector("#reset-btn")
const canvasCtx = imageCanvas.getContext("2d")
let file = null
let image = null

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

     input.addEventListener('input', (e) => {
        filters[ name ].value = input.value
        applyFilters()
          
        
     })

    return div
}

function createFilter(){

    Object.keys(filters).forEach( (key) =>{
        
        const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
        filtersContainer.appendChild(filterElement)
        
    })
}

createFilter()

imageInput.addEventListener("change", (e) => {
    file  = e.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceholder.style.display = "none"
    
    const img = new Image()
    img.src = URL.createObjectURL(file)
    
    img.onload = () =>{
        image = img
        imageCanvas.height = img.height
        imageCanvas.width = img.width
        canvasCtx.drawImage(img, 0, 0)
        
        
    }
    
})

function applyFilters(){
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit}) 
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayScale.value}${filters.grayScale.unit}) 
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit}) 
    invert(${filters.invert.value}${filters.invert.unit})
    `.trim()

    canvasCtx.drawImage(image, 0, 0)
    
}


resetFilters.addEventListener("click", () => {
    filters = {
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

applyFilters()
filtersContainer.innerHTML = ""
createFilter()


})





