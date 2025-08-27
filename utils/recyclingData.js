// utils/recyclingData.js
export const recyclingSymbols = {
  '1': {
    code: '1',
    name: 'PET',
    fullName: 'Polyethylene Terephthalate',
    material: 'Plastic',
    binType: 'Recycling Bin',
    recyclable: true,
    commonUses: [
      'Water bottles',
      'Soft drink bottles', 
      'Food containers',
      'Microwaveable food trays'
    ],
    recycledInto: [
      'New bottles',
      'Clothing fibers',
      'Carpeting',
      'Furniture stuffing'
    ],
    tips: [
      'Remove caps and lids',
      'Rinse clean',
      'Crush to save space',
      'Do not reuse for food storage'
    ],
    description: 'Most commonly recycled plastic. Clear, lightweight, and safe for single use.',
    color: '#4CAF50'
  },
  '2': {
    code: '2',
    name: 'HDPE',
    fullName: 'High-Density Polyethylene',
    material: 'Plastic',
    binType: 'Recycling Bin',
    recyclable: true,
    commonUses: [
      'Milk jugs',
      'Detergent bottles',
      'Yogurt containers',
      'Butter tubs'
    ],
    recycledInto: [
      'New containers',
      'Plastic lumber',
      'Playground equipment',
      'Trash cans'
    ],
    tips: [
      'Remove labels if possible',
      'Rinse thoroughly',
      'Keep caps on',
      'Safe to reuse'
    ],
    description: 'Very safe and commonly recycled. Often translucent white or colored.',
    color: '#2196F3'
  },
  '3': {
    code: '3',
    name: 'PVC',
    fullName: 'Polyvinyl Chloride',
    material: 'Plastic',
    binType: 'General Waste',
    recyclable: false,
    commonUses: [
      'Plumbing pipes',
      'Credit cards',
      'Vinyl siding',
      'Medical tubing'
    ],
    recycledInto: [
      'Limited recycling options',
      'Industrial applications only'
    ],
    tips: [
      'Usually not accepted in curbside recycling',
      'Check local hazardous waste programs',
      'Avoid heating',
      'Contains chlorine compounds'
    ],
    description: 'Rarely recycled due to toxic additives. Avoid when possible.',
    color: '#FF9800'
  },
  '4': {
    code: '4',
    name: 'LDPE',
    fullName: 'Low-Density Polyethylene',
    material: 'Plastic',
    binType: 'Special Collection',
    recyclable: true,
    commonUses: [
      'Plastic bags',
      'Food wraps',
      'Squeezable bottles',
      'Bread bags'
    ],
    recycledInto: [
      'New plastic bags',
      'Trash can liners',
      'Floor tiles',
      'Furniture'
    ],
    tips: [
      'Take bags to store collection bins',
      'Not accepted in curbside recycling',
      'Bundle together',
      'Keep dry and clean'
    ],
    description: 'Flexible plastic - take to special collection points at stores.',
    color: '#9C27B0'
  },
  '5': {
    code: '5',
    name: 'PP',
    fullName: 'Polypropylene',
    material: 'Plastic',
    binType: 'Recycling Bin',
    recyclable: true,
    commonUses: [
      'Yogurt containers',
      'Medicine bottles',
      'Bottle caps',
      'Straws'
    ],
    recycledInto: [
      'Auto parts',
      'Industrial fibers',
      'Food containers',
      'Rakes and scrapers'
    ],
    tips: [
      'Increasingly accepted in recycling',
      'Heat resistant',
      'Safe for food contact',
      'Remove any non-PP components'
    ],
    description: 'Growing acceptance in recycling programs. Heat resistant and safe.',
    color: '#FF5722'
  },
  '6': {
    code: '6',
    name: 'PS',
    fullName: 'Polystyrene',
    material: 'Plastic',
    binType: 'General Waste',
    recyclable: false,
    commonUses: [
      'Styrofoam cups',
      'Take-out containers',
      'Disposable plates',
      'Packing peanuts'
    ],
    recycledInto: [
      'Very limited recycling',
      'Some specialty programs exist'
    ],
    tips: [
      'Avoid when possible',
      'Not accepted in most programs',
      'Breaks into small pieces easily',
      'Can leach chemicals'
    ],
    description: 'Difficult to recycle and potentially harmful. Avoid disposable forms.',
    color: '#F44336'
  },
  '7': {
    code: '7',
    name: 'OTHER',
    fullName: 'Other Plastics',
    material: 'Mixed Plastic',
    binType: 'General Waste',
    recyclable: false,
    commonUses: [
      'Large containers',
      'Multi-layer packaging',
      'Mixed materials',
      'Some bottles'
    ],
    recycledInto: [
      'Very limited options',
      'Specialty processing required'
    ],
    tips: [
      'Usually not recyclable',
      'May contain BPA',
      'Check manufacturer for options',
      'Avoid heating'
    ],
    description: 'Catch-all category - usually not recyclable through standard programs.',
    color: '#607D8B'
  }
};

export const getRecyclingInfo = (code) => {
  return recyclingSymbols[code] || null;
};

export const getAllRecyclingInfo = () => {
  return Object.values(recyclingSymbols);
};

export const getBinTypeColor = (binType) => {
  const colors = {
    'Recycling Bin': '#4CAF50',
    'General Waste': '#757575',
    'Special Collection': '#FF9800',
    'Hazardous Waste': '#F44336'
  };
  return colors[binType] || '#757575';
};

export const getRecyclabilityStatus = (code) => {
  const info = getRecyclingInfo(code);
  if (!info) return 'Unknown';
  
  if (info.recyclable && info.binType === 'Recycling Bin') {
    return 'Easily Recyclable';
  } else if (info.recyclable && info.binType === 'Special Collection') {
    return 'Special Collection Required';
  } else {
    return 'Not Recyclable';
  }
};