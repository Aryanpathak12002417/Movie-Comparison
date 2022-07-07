const createAutoComplete=({root,renderOption,onOptionSelect,inputValue,fetchData})=>{
    root.innerHTML = `
    <label><b>Search</b></label>
    <div class="auto-item border">
        <input class="input1" placeholder="Search Movie">
    </div>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    <div>
    `;
    const input = root.querySelector('input');
    const dropdown=root.querySelector('.dropdown');
    const resultWrapper=root.querySelector('.results');

    const onInput = async event => {
        const items = await fetchData(event.target.value);
        if(!items.length){
            dropdown.classList.remove('is-active');
            return;
        }
        resultWrapper.innerHTML='';
        dropdown.classList.add('is-active');
        for (let itemSingular of items) { 
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
            option.innerHTML =renderOption(itemSingular);
            resultWrapper.append(option)

            option.addEventListener('click',event=>{
                dropdown.classList.remove('is-active');
                input.value=inputValue(itemSingular);
                onOptionSelect(itemSingular);
            })
        }
    }

    input.addEventListener('input', debounce(onInput))

    document.addEventListener('click',event=>{
        if(!root.contains(event.target)){
        dropdown.classList.remove('is-active'); 
        }
    });
}