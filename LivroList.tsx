import { useEffect, useState } from 'react';
import { getlivros, deletelivro } from '../services/api';
import { Link } from 'react-router-dom';
interface livro {
    id: string;
    titulo: string;
    autor: string;
    anolancamento: string;
    genero: string;
    numeropaginas: number;
}
function livroList() {
    const [livros, setlivros] = useState<livro[]>([]);
    useEffect(() => {
        loadlivros();
    }, []);
    const loadlivros = async () => {
    const response = await getlivros();
    setlivros(response.data);
    };
    const handleDelete = async (id: string) => {
        await deletelivro(id);
        loadlivros();
    };
return (
    <div>
        <h1>Lista de Livros</h1>
        <Link to="/add">ADICIONAR LIVRO</Link>
        <ul>
        {livros.map((livro) => (
        <li key={livro.id}>
            Titulo {livro.titulo} - Autor {livro.autor} - Ano de Lançamento: {livro.anolancamento} -
            Genero: {livro.genero} - N° PAGINAS {livro.numeropaginas}
            <Link to={`/edit/${livro.id}`}>Edit</Link>
        <button onClick={() => handleDelete(livro.id)}>Delete</button>
        </li>
        ))}
        </ul>
    </div>
    );
}
export default livroList;