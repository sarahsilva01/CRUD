import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createlivro, getlivroById, updatelivro } from '../services/api';
interface livro {
    id: number;
    titulo: string;
    autor: string;
    anolançamento: string;
    genero: string;
    numeropaginas: number;
   }
   function livroForm() {
        const { id } = useParams<{ id: string }>();
        const navigate = useNavigate();
        const [livro, setlivro] = useState<livro>({
            id: 0,
            titulo: '',
            autor: '',
            anolançamento: '',
            genero: '',
            numeropaginas: 0,
           
        });
    useEffect(() => {
        if (id) {
            loadlivro();
        }

    }, [id]);
    const loadlivro = async () => {
    try {
    const response = await getlivroById(id as string);
    setlivro(response.data);
} catch (error) {
    console.error("Error loading livro data", error);
    }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlivro({
    ...livro,
    [e.target.name]: e.target.value,
    });
    };
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    if (id) {
    await updatelivro(id, livro);
    } else {
    await createlivro(livro);
    }
    navigate('/');
    } catch (error) {
    console.error("Error saving livro", error);
    }
    };
    return (
        <form onSubmit={handleSubmit}>
 <div>
 <label>Titulo</label>
 <input
 type="text"
 name="titulo"
 value={livro.titulo}
 onChange={handleChange}
 />
 </div>
 <div>
 <label>Autor</label>
 <input
 type="text"
 name="autor"
 value={livro.autor}
 onChange={handleChange}
 />
 </div>
 <div>
 <label>Ano de Lançamento</label>
 <input
 type="text"
 name="anolançamento"
 value={livro.anolançamento}
 onChange={handleChange}
 />
 </div>
 <div>
 <label>Genero</label>
 <input
 type="text"
 name="genero"
 value={livro.genero}
 onChange={handleChange}
 />
 </div>
 <div>
 <label>Numero de Paginas</label>
 <input
 type="number"
 name="numeropaginas"
 value={livro.numeropaginas}
 onChange={handleChange}
 />
 </div>
 <button type="submit">Save</button>
 </form>
 );
}
export default livroForm;