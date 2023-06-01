function FormErrors({ errors }) {
	if (!errors || errors.length === 0) {
		return null;
	}

	return (
		<div className='alert alert-danger' role='alert'>
			<h3>Errors</h3>
			<p>The following errors occurred:</p>
			<ul>
				{errors.map((error, index) => (
					<li key={`${index}-${error}`}>{error}</li>
				))}
			</ul>
		</div>
	);
}

export default FormErrors;