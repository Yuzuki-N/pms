import {SearchPanel} from "./search-panel";
import {useEffect, useState} from "react";
import {List} from "./list";
import {cleanObject, useDebounce, useMount} from "../../utils";
import {useHtpp} from "../../utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {

  const [users, setUsers] = useState([])
  const [list, setList] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 200)
  const client = useHtpp()
  useEffect(() => {
    client('projects', {data: cleanObject(debouncedParam)}).then(setList)
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam}/>
      <List users={users} list={list}/>
    </Container>
  )
}
const Container = styled.div`
  padding: 3.2rem;
`
