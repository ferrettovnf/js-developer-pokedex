class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
    habilities = [];
    moves = [];
    movesPower = [];
    totalPower;
    weight;
    groups = [];
    specie = [];
    habitat;
    color;
    gender;
    movesType;
    evolution = [];
    

}

const formatOrder = (order) => {
    if (order < 10) return `#00${order}`;
    if (order < 100) return `#0${order}`;
    return `#${order}`;
  }
  
  const convertTypesToOl = (types = []) => {
    return types.map((type) => `<li class="type ${type}">${type}</li>`).join('');
  };
