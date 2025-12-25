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
const downloadButton = document.querySelector("#download-btn")
const canvasCtx = imageCanvas.getContext("2d")
const presetsContainer = document.querySelector(".presets")
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

downloadButton.addEventListener('click', () => {
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()

})

const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    drama: {
        brightness: 105,
        contrast: 150,
        saturation: 140,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    vintage: {
        brightness: 110,
        contrast: 90,
        saturation: 80,
        hueRotation: 10,
        blur: 1,
        grayScale: 10,
        sepia: 40,
        opacity: 100,
        invert: 0,
    },

    oldSchool: {
        brightness: 100,
        contrast: 120,
        saturation: 60,
        hueRotation: 0,
        blur: 0,
        grayScale: 20,
        sepia: 70,
        opacity: 100,
        invert: 0,
    },

    cinematic: {
        brightness: 95,
        contrast: 140,
        saturation: 85,
        hueRotation: 5,
        blur: 0,
        grayScale: 5,
        sepia: 10,
        opacity: 100,
        invert: 0,
    },

    warm: {
        brightness: 108,
        contrast: 105,
        saturation: 120,
        hueRotation: 8,
        blur: 0,
        grayScale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0,
    },

    cool: {
        brightness: 102,
        contrast: 110,
        saturation: 90,
        hueRotation: 190,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    blackAndWhite: {
        brightness: 100,
        contrast: 130,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayScale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    highContrast: {
        brightness: 100,
        contrast: 180,
        saturation: 130,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },

    softFade: {
        brightness: 115,
        contrast: 80,
        saturation: 70,
        hueRotation: 0,
        blur: 1,
        grayScale: 0,
        sepia: 10,
        opacity: 95,
        invert: 0,
    },

    inverted: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 100,
    }
};


Object.keys(presets).forEach( (presetName) =>{
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = presetName
    presetsContainer.appendChild(presetButton) 
    
     presetButton.addEventListener('click', () => {
        const preset = presets[presetName]
        
        Object.keys(preset).forEach( (filterName) => {
            filters[ filterName ].value = preset[ filterName]
        })

        applyFilters()
        filtersContainer.innerHTML = ""
        createFilter()
        
     })
})





