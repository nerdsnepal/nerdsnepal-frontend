"use client"
import { Category, CheckBox, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "@/app/state/reducer/filter";

const converCategoryIntoTreeNode = (categories)=>{
    let nodes =[]
    categories?.map((category,index)=>{
        let children = []
        category?.subCategory.map((value,index)=>{
            children.push({value:value,label:value})
        })
        nodes.push({value:category.name,label:category.name,children:Array.from(new Set(children))})
    })
    return Array.from(new Set(nodes))
}
const CategoryList = ({categories}) => {
    const checked = useSelector((state)=>state.proFilter?.categories)
    const dispatch = useDispatch()
    const [expanded, setExpanded] = useState([]);
    const nodes = converCategoryIntoTreeNode(categories)
    const onChecked = (value)=>{
        dispatch(setCategories(value))
    }
    const onExpand = (value)=>{
     setExpanded(value)
    }
  
    if(nodes.length===0)return
    return (<CheckboxTree
        nodes={nodes}
        checked={checked}
        showExpandAll
        expanded={expanded}
        onCheck={onChecked}
        onExpand={onExpand}
        iconsClass="mui"
        icons={{
            check:<CheckBox fontSize="large" />,
            collapseAll:<ExpandLess fontSize="large"/>,
            uncheck:<CheckBoxOutlineBlankIcon fontSize="large"/>,
            leaf:<></>,
            halfCheck:<IndeterminateCheckBoxIcon fontSize="large"/>,
            expandAll:<ExpandMoreIcon fontSize="large"/>,
            expandClose:<></>,
            expandOpen:<></>,
            parentClose:<></>,
            parentOpen:<></>
        }}
      />
    );
}
 
export default CategoryList;