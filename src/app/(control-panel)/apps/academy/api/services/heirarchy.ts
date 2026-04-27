type Team = {
  id: string;
  name: string;
  description: string;
  layers: number;
  levels: {
    name: string;
    rate: number;
  }[];
};

const STORAGE_KEY = "hierarchy_teams";

const getAll = (): Team[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveAll = (data: Team[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const hierarchyService = {
  async findAll(): Promise<Team[]> {
    return getAll();
  },

  async create(team: Omit<Team, "id">): Promise<Team> {
    const newTeam = { ...team, id: crypto.randomUUID() };
    const all = getAll();
    const updated = [...all, newTeam];
    saveAll(updated);
    return newTeam;
  },

  async update(id: string, updatedData: Partial<Team>): Promise<Team | null> {
    const all = getAll();
    let updatedTeam: Team | null = null;

    const updated = all.map((t) => {
      if (t.id === id) {
        updatedTeam = { ...t, ...updatedData };
        return updatedTeam;
      }
      return t;
    });

    saveAll(updated);
    return updatedTeam;
  },

  async delete(id: string): Promise<void> {
    const all = getAll();
    const updated = all.filter((t) => t.id !== id);
    saveAll(updated);
  },
};