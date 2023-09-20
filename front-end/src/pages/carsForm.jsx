import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import myfetch from '../utils/myfetch'
import Waiting from '../components/ui/waiting'
import Notification from '../components/ui/Notification'
import { useNavigate, useParams} from 'react-router-dom'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import InputMask from 'react-input-mask'
import { DatePicker, LocalizationProvider} from '@mui/x-date-pickers'
import { AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import ptLocale from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


export default function CarsForm() {

  const navigate = useNavigate()
  const params = useParams()

  //Valores
  const carDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: '',
    imported: false,
    plates: '',
    selling_date: undefined,
    selling_price: parseInt('')
  }

  const [state, setState] = React.useState({
    car: carDefaults,
    showWaiting: false,
    notification: {   show: false, severity: 'success', message: ''   },
    openDialogue: false,
    isFormModified: false
  })

  const {
    car,
    showWaiting,
    notification,
    openDialogue,
    isFormModified
  } = state

  const year = [
    {label: 1940, value: 1940},
    {label: 1941, value: 1941},
    {label: 1942, value: 1942},
    {label: 1943, value: 1943},
    {label: 1944, value: 1944},
    {label: 1945, value: 1945},
    {label: 1946, value: 1946},
    {label: 1947, value: 1947},
    {label: 1948, value: 1948},
    {label: 1940, value: 1949},
    {label: 1950, value: 1950},
    {label: 1951, value: 1951},
    {label: 1952, value: 1952},
    {label: 1953, value: 1953},
    {label: 1954, value: 1954},
    {label: 1955, value: 1955},
    {label: 1956, value: 1956},
    {label: 1957, value: 1957},
    {label: 1958, value: 1958},
    {label: 1959, value: 1959},
    {label: 1960, value: 1960},
    {label: 1961, value: 1961},
    {label: 1962, value: 1962},
    {label: 1963, value: 1963},
    {label: 1964, value: 1964},
    {label: 1965, value: 1965},
    {label: 1966, value: 1966},
    {label: 1967, value: 1967},
    {label: 1968, value: 1968},
    {label: 1969, value: 1969},
    {label: 1970, value: 1970},
    {label: 1971, value: 1971},
    {label: 1972, value: 1972},
    {label: 1973, value: 1973},
    {label: 1974, value: 1974},
    {label: 1975, value: 1975},
    {label: 1976, value: 1976},
    {label: 1977, value: 1977},
    {label: 1978, value: 1978},
    {label: 1979, value: 1979},
    {label: 1980, value: 1980},
    {label: 1981, value: 1981},
    {label: 1982, value: 1982},
    {label: 1983, value: 1983},
    {label: 1984, value: 1984},
    {label: 1985, value: 1985},
    {label: 1986, value: 1986},
    {label: 1987, value: 1987},
    {label: 1988, value: 1988},
    {label: 1989, value: 1989},
    {label: 1990, value: 1990},
    {label: 1991, value: 1991},
    {label: 1992, value: 1992},
    {label: 1993, value: 1993},
    {label: 1994, value: 1994},
    {label: 1995, value: 1995},
    {label: 1996, value: 1996},
    {label: 1997, value: 1997},
    {label: 1998, value: 1998},
    {label: 1999, value: 1999},
    {label: 2000, value: 2000},
    {label: 2001, value: 2001},
    {label: 2002, value: 2002},
    {label: 2003, value: 2003},
    {label: 2004, value: 2004},
    {label: 2005, value: 2005},
    {label: 2006, value: 2006},
    {label: 2007, value: 2007},
    {label: 2008, value: 2008},
    {label: 2009, value: 2009},
    {label: 2010, value: 2010},
    {label: 2011, value: 2011},
    {label: 2012, value: 2012},
    {label: 2013, value: 2013},
    {label: 2014, value: 2014},
    {label: 2015, value: 2015},
    {label: 2016, value: 2016},
    {label: 2017, value: 2017},
    {label: 2018, value: 2018},
    {label: 2019, value: 2019},
    {label: 2020, value: 2020},
    {label: 2021, value: 2021},
    {label: 2022, value: 2022},
    {label: 2023, value: 2023}
  ]


  const maskFormatChars = {
    '9': '[0-9]',
    'a': '[A-Za-z]',
    '*': '[a-Za-z0-9]',
    '_': '[\s0-9 ]' //Um espaço em branco ou um dígito
  }

  //useEffect com vetor de dependências vazio. Será executado uma vez, quando o componente for carregado
  React.useEffect(() => {
    //Verifica se existe o parâmetro id na rota.
    //Caso exista, chama a função fetchData() para carregar os dados indícados pelo parâmetro para edição
    if(params.id) fetchData()
  }, [])

  async function fetchData() {
    //Exibe o backdrop parar indicar que uma operação está ocorrendo em segundo plano
    setState({...state, showWaiting: true}) //Exibe o backdrop
    try {
      const result = await myfetch.get(`car/${params.id}`)

      //
      result.selling_date = parseISO(result.selling_date)

      setState({...state, showWaiting: false, car: result})
    }
    catch(error) {
      setState({...state,
        showWaiting: false, //Esconde o backdrop
        notification: {   show:true, severity: 'error', message: 'Erro! "' + error.message + '"'}
      })
    }
  }

  function handleFieldChange(event) {
    const newCar = {...car}
    newCar[event.target.name] = event.target.value

    setState({...state, car: newCar,
      isFormModified: true // O formulario foi alterado
    })
  }

  async function handleFormSubmit(event) {
    setState({...state, showWaiting: true}) //Exibe o backdrop
    event.preventDefault(false) //Evita o recarregamento da página
    try {

      let result

      //Se existir o campo id nos dados do cliente, chama o método PUT para alteração
      if(car.id) result = await myfetch.put(`car/${car.id}`, car)

      //Senão, chama o método POST para criar um novo registro
      else result = await myfetch.post('car', car)

      setState({...state,
        showWaiting: false, //Esconde o backdrop
        notification: {   show:true, severity: 'success', message: 'Dados foram salvos com sucesso!'}
      })
        }
    catch(error) {
      setState({...state,
        showWaiting: false, //Esconde o backdrop
        notification: {   show:true, severity: 'error', message: 'Erro! "' + error.message + '"'}
      })
    }
  }

  function handleNotificationClose() {
    const status = notification.severity
      
    //Fecha a barra de notificação
      setState({...state, notification: { show: false, severity: status, message: ''  }})

      //Volta para a pagina de clientes
      if (status === 'success') navigate('..', { relative: 'path'})
  }

  function handleBackButtonClose(event) {
    //Se o formulário tiver sido modificado, abre a caixa de diálogo para perguntar se quer mesmo voltar, perdendo as alterações
    if(isFormModified) setState({...state, openDialogue: true })

    //Senão volta a página de listagem
    else navigate('..', { relative: 'path' })
  }

  function handleDialogueClose(answer) {

    //Fechamos a caixa de diálogo
    setState({ ...state, openDialogue: false})

    //Se o usuário tiver respondido que quer voltar á página de listagem mesmo com alterações pendentes, faremos a vontade dele
    if(answer) navigate('..', { relative: 'path' })
  }
  
  return(
    <>

      <ConfirmDialog
        tittle="Atenção"
        open={openDialogue}
        onClose={handleDialogueClose}
      >
        Há alterações que ainda não foram salvas. Deseja mesmo voltar?
      </ConfirmDialog>

      <Waiting show={showWaiting} />

      <Notification
        show={notification.show}
        severity={notification.severity}
        message={notification.message}
        onClose={handleNotificationClose}
      />

      <Typography variant="h1" sx={{ mb: '50px' }}>
        Cadastro de carros
      </Typography>

      <form onSubmit={handleFormSubmit}>

      <Box className="form_fields">

      <TextField
          id="brand"
          name="brand"
          label="Marca do carro"
          variant="filled"
          required
          fullwidth
          value={car.brand}
          onChange={handleFieldChange}
          autoFocus
          />

        <TextField
          id="model"
          name="model"
          label="Modelo do carro"
          variant="filled"
          required
          fullwidth
          value={car.model}
          onChange={handleFieldChange}
          />

          <TextField
          id="color"
          name="color"
          label="Cor do carro"
          variant="filled"
          required
          fullwidth
          value={car.color}
          onChange={handleFieldChange}
          />

          <TextField
            id="year_manufacture"
            name="year_manufacture"
            select
            label="ano de Fabricação"
            variant="filled"
            required
            fullwidth
            onChange={handleFieldChange}
            value={car.year_manufacture}
          >
            {year.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <FormControlLabel
            id="imported"
            name="imported"
            value={car.imported}
            control={
                <Switch color="primary" />}
            label="É importado?"
            labelPlacement="start"
            onClick={handleFieldChange}
          />
          
          <InputMask
            mask="aaa-9a99"
            maskChar=" "
            value={car.plates}
            onChange={handleFieldChange}
          >
            {
              () => <TextField 
                id="plates"
                name="plates" 
                label="N° da Placa" 
                variant="filled"
                required
                fullwidth
              />
            }
          </InputMask>
          
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptLocale}>
            <DatePicker
              label="Data da venda"
              value={car.selling_date}
              onChange={ value =>
                handleFieldChange({ target: { name: 'selling_date', value } })
              }
              slotProps={{ textField: { variant: 'filled', fullwidth: true } }}
            />
          </LocalizationProvider>

          <TextField
          id="selling_price"
          name="selling_price"
          label="Preço de venda"
          variant="filled"
          fullwidth
          value={car.selling_price}
          type='number'
          onChange={handleFieldChange}
          />

      </Box>

        <Toolbar className="salvar_voltar">
          <Button variant="contained" color="secondary" type="submit"> Salvar </Button>
          
          <Button variant="outlined"
            onClick={handleBackButtonClose}> Voltar </Button>
        </Toolbar>

      </form>
    </>
  )
}