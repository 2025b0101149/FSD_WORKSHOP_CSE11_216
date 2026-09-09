function Dashboard() {
    return (
        <section id="dashboard" className="content-section dashboard">
        <p className="tag">DASHBOARD</p>
        <h2>Your overview</h2>

        <div className="cards">
            <article className="card">
            <span>Projects</span>
            <strong>12</strong>
            </article>
            <article className="card">
            <span>Tasks Done</span>
            <strong>49</strong>
            </article>
            <article className="card">
            <span>Progress</span>
            <strong>76%</strong>
            </article>
        </div>
        </section>
    );
    }

    export default Dashboard;