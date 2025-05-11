namespace backend.Models;
public class Transaction
{
    public int Id { get; set; }
    public string? Type { get; set; } // "income" o "expense"
    public string? Category { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public string? Description { get; set; }
}
